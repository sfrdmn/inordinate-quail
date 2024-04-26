'use client'

import { useState, useCallback, ChangeEventHandler } from 'react'
import { useFormState } from 'react-dom'

import Submit from '@/app/components/Submit'
import { TemperatureReading } from '@/app/types'
import { addTemperatureReading } from '@/app/actions'
import { getDateString, isToday } from '@/app/util'

export type AddTemperatureFormProps = {
  patientId: string,
  lastReading?: TemperatureReading
}

export default function AddTemperatureForm({ patientId, lastReading }: AddTemperatureFormProps) {
  const today = getDateString(new Date)
  const hasReading = lastReading && isToday(lastReading.date)
  const [formState, action] = useFormState(
    addTemperatureReading,
    hasReading ? { data: lastReading } : {
      data: {
        id: '',
        // Assumes input will be in local timezone.
        date: today,
        value: '',
      }
    }
  )
  const [temperatureInput, setTemperatureInput] = useState('')
  const onChangeTemperature: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTemperatureInput(e.target.value)
  }, [])

  return (
    <form className="grid grid-cols-2 grid-rows-4 gap-4" action={action}>
      <p className="text-red-500 col-span-2">{String(formState.error?.message ?? '')}</p>
      <input id="patientId" name="patientId" type="hidden" value={patientId} required />
      <label className="p-2 font-bold" htmlFor="date">Date</label>
      <input
        className="text-right p-2"
        id="date"
        name="date"
        type="text"
        value={today}
        readOnly
        required
      />
      <label className="p-2 font-bold" htmlFor="value">Temperature</label>
      <input
        className="text-right p-2"
        id="value"
        name="value"
        type="text"
        value={formState.data?.value || temperatureInput}
        onChange={onChangeTemperature}
        readOnly={hasReading}
        required
      />
      {!hasReading && <Submit className="col-span-2">Submit Daily Temperature</Submit>}
    </form>
  )
}
