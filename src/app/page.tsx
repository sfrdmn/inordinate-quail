import Link from 'next/link'

import { Patient } from '@/app/types'
import api from '@/app/api'
import Card from '@/app/components/Card'

type PatientListItemProps = {
  className?: string
  patient: Patient
}

function PatientListItem({ className, patient }: PatientListItemProps) {
  return (
    <Link href={`patients/${patient.id}`}>
      <li className={`${className}`}>
        <Card>
        <span>{patient.firstName}</span>
          <span>{patient.lastName}</span>
        </Card>
      </li>
    </Link>
  )
}

type PatientsListViewProps = {
  className?: string
}

async function PatientsListView({ className }: PatientsListViewProps) {
  const patients = await api.getPatients()

  if (patients.error) {
    return
  }

  return (
    <ul className={className}>
      {patients.data.map(patient => (
        <PatientListItem
          key={patient.id}
          className="mb-4"
          patient={patient}
        />
      ))}
    </ul>
  )
}

export const metadata = {
  title: 'Patient Manager | My Patients'
}

export default function Home() {
  return (
    <PatientsListView />
  );
}
