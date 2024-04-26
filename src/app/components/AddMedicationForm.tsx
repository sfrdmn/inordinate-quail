'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import Submit from '@/app/components/Submit'
import { addPatientMedication } from '@/app/actions'

export type AddMedicationFormProps = {
  patientId: string,
}

export default function AddMedicationForm({ patientId }: AddMedicationFormProps) {
  const [formState, action] = useFormState(addPatientMedication, {
    data: {
      id: '',
      name: '',
      dosage: '',
      startDate: '',
      endDate: '',
    }
  })
  const [nameInput, setNameInput] = useState('')
  const [dosageInput, setDosageInput] = useState('')
  const [startDateInput, setStartDateInput] = useState('')
  const [endDateInput, setEndDateInput] = useState('')

  return (
    <form className="grid grid-cols-4 grid-rows-4 gap-4" action={action}>
      <p className="text-red-500 col-span-4">{String(formState.error?.message ?? '')}</p>
      <input id="patientId" name="patientId" type="hidden" value={patientId} required />
      <label className="p-2 font-bold" htmlFor="name">Name</label>
      <input
        className="text-right p-2"
        id="name"
        name="name"
        type="text"
        onChange={e => setNameInput(e.target.value)}
        value={nameInput}
      />
      <label className="p-2 font-bold" htmlFor="dosage">Dosage</label>
      <input
        className="text-right p-2"
        id="dosage"
        name="dosage"
        type="text"
        onChange={e => setDosageInput(e.target.value)}
        value={dosageInput}
      />
      <label className="p-2 font-bold" htmlFor="startDate">Start Date</label>
      <input
        className="text-right p-2"
        id="startDate"
        name="startDate"
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={e => setStartDateInput(e.target.value)}
        value={startDateInput}
      />
      <label className="p-2 font-bold" htmlFor="endDate">End Date</label>
      <input
        className="text-right p-2"
        id="endDate"
        name="endDate"
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={e => setEndDateInput(e.target.value)}
        value={endDateInput}
      />
      <Submit className="col-span-4">Add</Submit>
    </form>
  )
}
