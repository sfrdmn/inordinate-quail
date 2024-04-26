/**
 * DB client implementation. Callback interface is used for automatic connection closing.
 * In production code, this would be resolved via configuration, dependency injection, etc.
 * Per-call open and close behavior is not performant, but used for simplicity.
 */

import { Level } from 'level'
import { AbstractLevel, AbstractSublevel } from 'abstract-level'

export type Db = AbstractLevel<string | Buffer | Uint8Array, string, string>

export type Collection = AbstractSublevel<Db | Collection, string | Buffer | Uint8Array, string, Record<string, unknown>>

export type DbCallback<Db, R> = (db: Db) => R | Promise<R>

export interface DbClient {
  root<R>(withDb: DbCallback<Db, R>): Promise<R>
  patients<R>(withDb: DbCallback<Collection, R>): Promise<R>
  temperatureReadings<R>(patientId: string, withDb: DbCallback<Collection, R>): Promise<R>
  medications<R>(patientId: string, withDb: DbCallback<Collection, R>): Promise<R>
}

export default function create(): DbClient {
  async function root<R>(withDb: DbCallback<Db, R>) {
    const db = new Level<string, string>('db')
    await db.open()
    const result = await withDb(db)
    await db.close()
    return result
  }

  async function patients<R>(withDb: DbCallback<Collection, R>) {
    return await root(async (db) => {
      const coll = db.sublevel<string, Record<string, unknown>>(
        'patients',
        { valueEncoding: 'json' }
      )
      await coll.open()
      const result = await withDb(coll)
      await coll.close()
      return result
    })
  }

  async function temperatureReadings<R>(patientId: string, withDb: DbCallback<Collection, R>) {
    return await root(async (db) => {
      const coll = db
        .sublevel('temperature_readings')
        .sublevel<string, Record<string, unknown>>(
          patientId,
          { valueEncoding: 'json' }
        )
      await coll.open()
      const result = await withDb(coll)
      await coll.close()
      return result
    })
  }

  async function medications<R>(patientId: string, withDb: DbCallback<Collection, R>) {
    return await root(async (db) => {
      const coll = db
        .sublevel(
          'medications',
        ).sublevel<string, Record<string, unknown>>(
          patientId,
          { valueEncoding: 'json' }
        )
      await coll.open()
      const result = await withDb(coll)
      await coll.close()
      return result
    })
  }

  return {
    root,
    patients,
    temperatureReadings,
    medications
  }
}
