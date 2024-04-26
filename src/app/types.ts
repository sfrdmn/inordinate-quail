export type Patient = {
  id: string
  firstName?: string
  lastName?: string
  height?: number
  weight?: number
  gender?: string
  age?: number
}

export type TemperatureReading = {
  id: string
  date: string
  value: string
}

export type PatientMedication = {
  id: string
  name?: string
  dosage?: string
  startDate?: string
  endDate?: string
}

/**
 * Generic server response format.
 */
export type Result<Data> = {
  data: Data
  error?: null | undefined
} | {
  data?: null | undefined
  error: {
    message: string
  }
}

export type PaginationMeta = {
  offset?: string
}

export type PaginatedResult<Data> =  PaginationMeta & Result<Data>

/**
 * Helper type for intermediate resource representations before being saved to
 * a database.
 */
export type Transient<Type> = Omit<Type, "id">

// In a production codebase this might be a generated interface.
export interface ApiClient {
  getPatients(): Promise<PaginatedResult<Patient[]>>
  getPatient(patientId: string): Promise<Result<Patient>>
  getTemperatureReadings(patientId: string): Promise<PaginatedResult<TemperatureReading[]>>
  getMedications(patientId: string): Promise<PaginatedResult<PatientMedication[]>>

  addMedication(patientId: string, medication: Transient<PatientMedication>): Promise<Result<PatientMedication>>
  removeMedication(patientId: string, id: string): Promise<Result<string>>

  addTemperatureReading(patientId: string, reading: Transient<TemperatureReading>): Promise<Result<TemperatureReading>>
}
