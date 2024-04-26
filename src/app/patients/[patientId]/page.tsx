import type { Metadata } from 'next'

import { PatientMedication } from '@/app/types'
import api from '@/app/api'
import Card from '@/app/components/Card'
import Title from '@/app/components/Title'
import TabularHeader from '@/app/components/TabularHeader'
import AddTemperatureForm from '@/app/components/AddTemperatureForm'
import AddMedicationForm from '@/app/components/AddMedicationForm'
import TemperatureChart from '@/app/components/TemperatureChart'
import DeleteMedicationButton from '@/app/components/DeleteMedicationButton'

type MedicationsOverviewProps = {
  className?: string
  patientId: string
  medications: PatientMedication[]
}

function MedicationsOverview({ className = '', patientId, medications }: MedicationsOverviewProps) {
  return (
    <ul className={className}>
      {medications.map((medication) => {
        return (
          <li key={medication.id} className="bg-blue-200 border border-blue-400 rounded mt-4 p-4 flex">
            <TabularHeader
              className="flex-1"
              data={[{
                key: 'Name',
                value: medication.name ?? '',
              }, {
                key: 'Dosage',
                value: medication.dosage ?? '',
              }, {
                key: 'Start Date',
                value: medication.startDate ?? '',
              }, {
                key: 'End Date',
                value: medication.endDate ?? '',
              }]}
            />
            <DeleteMedicationButton patientId={patientId} medicationId={medication.id} />
          </li>
        )
      })}
      <li className="bg-blue-200 border border-blue-400 rounded mt-4 p-4">
        <h1 className="text-xl text-slate-800 text-center">Add New Medication</h1>
        <AddMedicationForm patientId={patientId} />
      </li>
    </ul>
  )
}

type PatientDetailViewProps = {
  patientId: string
}

async function PatientDetailView({ patientId }: PatientDetailViewProps) {
  const patient = await api.getPatient(patientId)
  const readings = await api.getTemperatureReadings(patientId)
  const medications = await api.getMedications(patientId)

  if (patient.error || readings.error || medications.error) {
    return
  }

  const lastReading = readings.data.slice(-1)[0]

  const headerData = [{
    key: 'First',
    value: patient.data.firstName ?? '',    
  }, {
    key: 'Last',
    value: patient.data.lastName ?? '',    
  }, {
    key: 'Age',
    value: String(patient.data.age ?? '')
  }]

  return (
    <section className="grid grid-cols-2 gap-4">
      <Card className="col-span-2">
        <Title>Overview</Title>
        <TabularHeader data={headerData} />
      </Card>
      <Card>
        <Title>Today&rsquo;s Temperature</Title>
        <AddTemperatureForm patientId={patientId} lastReading={lastReading} />
      </Card>
      <Card>
        <Title>Temperature Record</Title>
        <TemperatureChart
          height={200}
          readings={readings.data}
        />
      </Card>
      <Card className="col-span-2">
        <Title>Medications</Title>
        <MedicationsOverview patientId={patientId} medications={medications.data} />
      </Card>
    </section>
  )
}

export type PatientDetailPageProps = {
  params: {
    patientId: string
  }
}

export default function PatientDetailPage({ params: { patientId } }: PatientDetailPageProps) {
  return (
    <PatientDetailView patientId={patientId} />
  )
}

export async function generateMetadata(
  { params: { patientId } }: PatientDetailPageProps,
): Promise<Metadata> {
  return {
    title: `Patient Manager | ${patientId}`
  }
}
