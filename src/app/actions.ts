'use server'

/**
 * Implements React server actions for mutating state.
 */

import { revalidatePath } from 'next/cache'

import { Result, TemperatureReading, PatientMedication } from '@/app/types'
import api from '@/app/api'

export async function addTemperatureReading(_: Result<TemperatureReading>, data: FormData) {
  try {
    const patientId = String(data.get('patientId') ?? '')
    const date = String(data.get('date') ?? '')
    const value = String(data.get('value') ?? '')

    if (!patientId || !date || !value) {
      return { error: { message: 'Required field not present in form' } }
    }

    const parsed = parseFloat(value)

    if (isNaN(parsed)) {
      return { error: { message: 'Temperature must be a valid decimal number' } }
    }

    const result = await api.addTemperatureReading(patientId, { date, value })

    // TODO Feels badly coupled here.
    revalidatePath(`/patients/${patientId}`)

    return result
  } catch (error) {
    return { error: { message: String(error) } }
  }
}

export async function addPatientMedication(_: Result<PatientMedication>, data: FormData) {
  try {
    const patientId = String(data.get('patientId') ?? '')
    const name = String(data.get('name') ?? '')
    const dosage = String(data.get('dosage') ?? '')
    const startDate = String(data.get('startDate') ?? '')
    const endDate = String(data.get('endDate') ?? '')

    if (!patientId || !name) {
      return { error: { message: 'Required field not present in form' } }
    }

    const result = await api.addMedication(patientId, {
      name,
      dosage,
      startDate,
      endDate,
    })

    // TODO Feels badly coupled here.
    revalidatePath(`/patients/${patientId}`)

    return result
  } catch (error) {
    return { error: { message: String(error) } }
  }
}

export async function removePatientMedication(patientId: string, id: string) {
  const result = await api.removeMedication(patientId, id)

  // TODO Feels badly coupled here.
  revalidatePath(`/patients/${patientId}`)

  return result
}
