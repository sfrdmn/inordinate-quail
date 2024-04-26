/**
 * Exports API client implementation. In fact, the backend is directly implemented here.
 * In production, this would be resolved via configuration, dependency injection, etc.
 * It would likely also call out to another backend service rather implement it on the
 * frontend server.
 */

import { randomUUID } from 'node:crypto'

import { ApiClient, Transient, Patient, PatientMedication, TemperatureReading } from '@/app/types'
import db from '@/app/db'

function isPatient(data: Record<string, unknown>): data is Patient {
  return typeof data.id === 'string'
}

function isTemperatureReading(data: Record<string, unknown>): data is TemperatureReading {
  return typeof data.id === 'string' && typeof data.date === 'string' && typeof data.value === 'string'
}

function isMedication(data: Record<string, unknown>): data is PatientMedication {
  return typeof data.id === 'string'
}

const api: ApiClient = {
  async getPatients() {
    return await db().patients(async (patients) => {
      let data: Patient[] = []    
      
      for await (const value of patients.values()) {
        if (!isPatient(value)) {
          return {
            error: { message: 'Invalid patient data in DB' }
          }
        }
      
        data.push(value)
      }

      return { data }
    })   
  },

  async getPatient(patientId: string) {
    return await db().patients(async (patients) => {    
      const patient = await patients.get(patientId)

      if (!isPatient(patient)) {
        return {
          error: { message: 'Invalid patient data in DB' }
        }
      }

      return { data: patient }
    })
  },

  async getTemperatureReadings(patientId: string) {
    return await db().temperatureReadings(patientId, async (readings) => {
      let data: TemperatureReading[] = []
    
      for await (const value of readings.values()) {
        if (!isTemperatureReading(value)) {
          return {
            error: { message: 'Invalid temperature data in DB' }
          }
        }
      
        data.push(value)
      }

      return { data }
    })   
  },

  async getMedications(patientId: string) {
    return await db().medications(patientId, async (medications) => {
      let data: PatientMedication[] = []
    
      for await (const value of medications.values()) {
        if (!isMedication(value)) {
          return {
            error: { message: 'Invalid medication data in DB' }
          }
        }
      
        data.push(value)
      }

      return { data }
    })
  },

  async addMedication(patientId: string, medication: Transient<PatientMedication>) {
    return await db().medications(patientId, async (medications) => {
      const id = randomUUID()
      const data = {
        ...medication,
        id
      }

      await medications.put(id, data)

      return { data  }
    })    
  },

  async removeMedication(patientId: string, id: string) {
    return await db().medications(patientId, async (medications) => {
      await medications.del(id)

      return { data: id }
    })   
  },

  async addTemperatureReading(patientId: string, reading: Transient<TemperatureReading>) {
    return await db().temperatureReadings(patientId, async (readings) => {
      const id = randomUUID()
      const data = {
        ...reading,
        id
      }

      await readings.put(reading.date, data)

      return { data }
    })
  },
}

export default api
