'use client'

import { removePatientMedication } from '@/app/actions'

export type DeleteMedicationButtonProps = {
  className?: string
  patientId: string
  medicationId: string
}

export default function DeleteMedicationButton({
  className = '',
  patientId,
  medicationId
}: DeleteMedicationButtonProps) {
  return (
    <div className={`${className} text-red-500 text-3xl basis-auto flex flex-col justify-center`}>
      <button onClick={() => removePatientMedication(patientId, medicationId)}>
        ✘
      </button>
    </div>
  )
}
