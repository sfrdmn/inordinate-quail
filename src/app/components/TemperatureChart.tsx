'use client'

import {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ChangeEventHandler
} from 'react'
import { plot, lineY } from '@observablehq/plot'

import { TemperatureReading } from '@/app/types'
import { rangeForMonths } from '@/app/util'

export type TemperatureChartProps = {
  readings: TemperatureReading[]
  height?: number
}

export default function TemperatureChart({
  height = 200,
  readings,
}: TemperatureChartProps)  {
  const el = useRef<HTMLDivElement>(null)
  const [domainMonths, setDomainMonths] = useState(1)
  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    setDomainMonths(parseInt(e.target.value, 10))
  }, []);
  const lastReading = readings.slice(-1)[0]
  const xDomain = useMemo(() => rangeForMonths(domainMonths, {
    upper: lastReading ? new Date(lastReading.date) : undefined,
    cushion: 1,
  }), [domainMonths, lastReading])
  const data = useMemo(() => (
    readings
      .map(({ date, value }) => ({
        date: new Date(date),
        value: parseFloat(value),
      }))
      .filter(({ date }) => date > xDomain[0])
  ), [readings, xDomain])

  useEffect(() => {
    const chart = plot({
      height,
      x: { domain: xDomain, grid: true, ticks: 10 },
      y: { domain: [30, 40], grid: true, ticks: 6 },
      marks: [
        lineY(
          data,
          {
            x: 'date',
            y: 'value',
            marker: 'circle'
          })
      ]
    })

    if (el.current) {
      el.current.append(chart)
    }

    return () => chart.remove()
  }, [data, height, xDomain])

  return (
    <div>
      <form className="my-2">
        <label className="mr-2" htmlFor="months">Months</label>
        <select id="months" name="months" value={domainMonths} onChange={onChange}>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="6">6</option>
        </select>
      </form>
      <div style={{ height }} ref={el} />
    </div>
  )
}
