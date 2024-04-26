/**
 * This file is responsble for seeding the database at server initialization.
 */

import { randomUUID } from 'node:crypto'

import db from '@/app/db'

/**
 * Ad-hoc flag to record whether the database has been initialized
 * with seed data.
 */
const InitializationKey = '__IS_INITIALIZED__'

const SeedData = [
  {
    'name': 'Patient_1',
    'first_name': 'FirstName_1',
    'age': 53,
    'height': 157,
    'weight': 42,
    'gender': 'Female',
    'medications': [
      {
        'name': 'Medication 7',
        'dosage': '53mg',
        'start_date': '2023-08-10',
        'end_date': '2023-08-29'
      },
      {
        'name': 'Medication 8',
        'dosage': '34mg',
        'start_date': '2023-05-12',
        'end_date': '2023-06-02'
      },
      {
        'name': 'Medication 5',
        'dosage': '33mg',
        'start_date': '2023-09-09',
        'end_date': '2023-09-18'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 38
      },
      {
        'date': '2023-12-07',
        'temperature': 37.6
      },
      {
        'date': '2023-12-06',
        'temperature': 36.2
      },
      {
        'date': '2023-12-05',
        'temperature': 36.1
      },
      {
        'date': '2023-12-04',
        'temperature': 37.4
      }
    ]
  },
  {
    'name': 'Patient_2',
    'first_name': 'FirstName_2',
    'age': 32,
    'height': 154,
    'weight': 83,
    'gender': 'Male',
    'medications': [
      {
        'name': 'Medication 6',
        'dosage': '62mg'
      },
      {
        'name': 'Medication 3',
        'dosage': '26mg'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 37.3
      },
      {
        'date': '2023-12-07',
        'temperature': 37.4
      },
      {
        'date': '2023-12-06',
        'temperature': 37.7
      },
      {
        'date': '2023-12-05',
        'temperature': 36.6
      },
      {
        'date': '2023-12-04',
        'temperature': 37.5
      },
      {
        'date': '2023-12-03',
        'temperature': 37.3
      },
      {
        'date': '2023-12-02',
        'temperature': 36.2
      },
      {
        'date': '2023-12-01',
        'temperature': 36.2
      },
      {
        'date': '2023-11-30',
        'temperature': 36.1
      },
      {
        'date': '2023-11-29',
        'temperature': 37.6
      },
      {
        'date': '2023-11-28',
        'temperature': 37.5
      },
      {
        'date': '2023-11-27',
        'temperature': 36.7
      },
      {
        'date': '2023-11-26',
        'temperature': 36.1
      },
      {
        'date': '2023-11-25',
        'temperature': 36.3
      },
      {
        'date': '2023-11-24',
        'temperature': 36.1
      },
      {
        'date': '2023-11-23',
        'temperature': 37.8
      },
      {
        'date': '2023-11-22',
        'temperature': 36.7
      },
      {
        'date': '2023-11-21',
        'temperature': 36.8
      },
      {
        'date': '2023-11-20',
        'temperature': 36.6
      },
      {
        'date': '2023-11-19',
        'temperature': 36.6
      },
      {
        'date': '2023-11-18',
        'temperature': 36.7
      },
      {
        'date': '2023-11-17',
        'temperature': 36.1
      },
      {
        'date': '2023-11-16',
        'temperature': 36.3
      },
      {
        'date': '2023-11-15',
        'temperature': 36.3
      },
      {
        'date': '2023-11-14',
        'temperature': 36.4
      },
      {
        'date': '2023-11-13',
        'temperature': 36.5
      },
      {
        'date': '2023-11-12',
        'temperature': 37
      },
      {
        'date': '2023-11-11',
        'temperature': 36.8
      },
      {
        'date': '2023-11-10',
        'temperature': 37.6
      },
      {
        'date': '2023-11-09',
        'temperature': 37.3
      },
      {
        'date': '2023-11-08',
        'temperature': 37.4
      },
      {
        'date': '2023-11-07',
        'temperature': 37.7
      },
      {
        'date': '2023-11-06',
        'temperature': 36.2
      },
      {
        'date': '2023-11-05',
        'temperature': 37.9
      },
      {
        'date': '2023-11-04',
        'temperature': 36.6
      },
      {
        'date': '2023-11-03',
        'temperature': 36.1
      },
      {
        'date': '2023-11-02',
        'temperature': 37.2
      },
      {
        'date': '2023-11-01',
        'temperature': 36.7
      },
      {
        'date': '2023-10-31',
        'temperature': 37.6
      },
      {
        'date': '2023-10-30',
        'temperature': 37.7
      },
      {
        'date': '2023-10-29',
        'temperature': 36.3
      },
      {
        'date': '2023-10-28',
        'temperature': 36.7
      },
      {
        'date': '2023-10-27',
        'temperature': 37.9
      },
      {
        'date': '2023-10-26',
        'temperature': 36.4
      },
      {
        'date': '2023-10-25',
        'temperature': 37.2
      },
      {
        'date': '2023-10-24',
        'temperature': 36.5
      },
      {
        'date': '2023-10-23',
        'temperature': 36.6
      },
      {
        'date': '2023-10-22',
        'temperature': 36.2
      },
      {
        'date': '2023-10-21',
        'temperature': 37.6
      },
      {
        'date': '2023-10-20',
        'temperature': 36.1
      }
    ]
  },
  {
    'name': 'Patient_3',
    'first_name': 'FirstName_3',
    'age': 18,
    'height': 153,
    'weight': 88,
    'gender': 'Female',
    'medications': [
      {
        'name': 'Medication 5',
        'dosage': '98mg'
      },
      {
        'name': 'Medication 9',
        'dosage': '18mg',
        'start_date': '2023-01-01',
        'end_date': '2023-01-08'
      },
      {
        'name': 'Medication 9',
        'dosage': '63mg'
      },
      {
        'name': 'Medication 6',
        'dosage': '63mg',
        'start_date': '2023-05-03',
        'end_date': '2023-05-10'
      }
    ],
    'body_temperatures': []
  },
  {
    'name': 'Patient_4',
    'first_name': 'FirstName_4',
    'age': 44,
    'height': 172,
    'weight': 70,
    'gender': 'Female',
    'medications': [],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 36.4
      }
    ]
  },
  {
    'name': 'Patient_5',
    'first_name': 'FirstName_5',
    'age': 67,
    'height': 179,
    'weight': 70,
    'gender': 'Female',
    'medications': [
      {
        'name': 'Medication 1',
        'dosage': '77mg'
      },
      {
        'name': 'Medication 7',
        'dosage': '84mg',
        'start_date': '2022-12-29',
        'end_date': '2023-01-03'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 36.8
      },
      {
        'date': '2023-12-07',
        'temperature': 36.8
      },
      {
        'date': '2023-12-06',
        'temperature': 36.3
      },
      {
        'date': '2023-12-05',
        'temperature': 36.2
      },
      {
        'date': '2023-12-04',
        'temperature': 36.4
      },
      {
        'date': '2023-12-03',
        'temperature': 36.1
      },
      {
        'date': '2023-12-02',
        'temperature': 37.9
      },
      {
        'date': '2023-12-01',
        'temperature': 37.3
      },
      {
        'date': '2023-11-30',
        'temperature': 36.9
      },
      {
        'date': '2023-11-29',
        'temperature': 36.6
      },
      {
        'date': '2023-11-28',
        'temperature': 36.8
      },
      {
        'date': '2023-11-27',
        'temperature': 37.6
      },
      {
        'date': '2023-11-26',
        'temperature': 37
      }
    ]
  },
  {
    'name': 'Patient_7',
    'first_name': 'FirstName_7',
    'age': 54,
    'height': 178,
    'weight': 126,
    'gender': 'Female',
    'medications': [
      {
        'name': 'Medication 4',
        'dosage': '99mg',
        'start_date': '2023-04-16',
        'end_date': '2023-04-22'
      },
      {
        'name': 'Medication 8',
        'dosage': '75mg',
        'start_date': '2023-04-18',
        'end_date': '2023-05-11'
      },
      {
        'name': 'Medication 1',
        'dosage': '39mg'
      },
      {
        'name': 'Medication 7',
        'dosage': '37mg',
        'start_date': '2023-02-09',
        'end_date': '2023-03-10'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 37.3
      },
      {
        'date': '2023-12-07',
        'temperature': 37.7
      },
      {
        'date': '2023-12-06',
        'temperature': 36.1
      }
    ]
  },
  {
    'name': 'Patient_8',
    'first_name': 'FirstName_8',
    'age': 31,
    'height': 157,
    'weight': 81,
    'gender': 'Male',
    'medications': [
      {
        'name': 'Medication 6',
        'dosage': '94mg',
        'start_date': '2023-01-10',
        'end_date': '2023-01-16'
      },
      {
        'name': 'Medication 2',
        'dosage': '78mg'
      },
      {
        'name': 'Medication 1',
        'dosage': '98mg',
        'start_date': '2022-12-27',
        'end_date': '2023-01-12'
      },
      {
        'name': 'Medication 8',
        'dosage': '30mg',
        'start_date': '2022-12-11',
        'end_date': '2022-12-30'
      },
      {
        'name': 'Medication 5',
        'dosage': '38mg',
        'start_date': '2023-07-21',
        'end_date': '2023-07-26'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 37.1
      },
      {
        'date': '2023-12-07',
        'temperature': 37.4
      },
      {
        'date': '2023-12-06',
        'temperature': 37.4
      },
      {
        'date': '2023-12-05',
        'temperature': 36.3
      }
    ]
  },
  {
    'name': 'Patient_9',
    'first_name': 'FirstName_9',
    'age': 27,
    'height': 151,
    'weight': 86,
    'gender': 'Female',
    'medications': [
      {
        'name': 'Medication 6',
        'dosage': '91mg',
        'start_date': '2023-03-15',
        'end_date': '2023-04-02'
      }
    ],
    'body_temperatures': [
      {
        'date': '2023-12-08',
        'temperature': 36
      },
      {
        'date': '2023-12-07',
        'temperature': 36.4
      },
      {
        'date': '2023-12-06',
        'temperature': 37.5
      },
      {
        'date': '2023-12-05',
        'temperature': 36.1
      },
      {
        'date': '2023-12-04',
        'temperature': 37.2
      },
      {
        'date': '2023-12-03',
        'temperature': 36.2
      },
      {
        'date': '2023-12-02',
        'temperature': 37.7
      },
      {
        'date': '2023-12-01',
        'temperature': 37.7
      },
      {
        'date': '2023-11-30',
        'temperature': 36.1
      },
      {
        'date': '2023-11-29',
        'temperature': 38
      },
      {
        'date': '2023-11-28',
        'temperature': 36.8
      },
      {
        'date': '2023-11-27',
        'temperature': 36.2
      },
      {
        'date': '2023-11-26',
        'temperature': 36.1
      },
      {
        'date': '2023-11-25',
        'temperature': 36.2
      },
      {
        'date': '2023-11-24',
        'temperature': 37.5
      },
      {
        'date': '2023-11-23',
        'temperature': 37.5
      },
      {
        'date': '2023-11-22',
        'temperature': 37.6
      },
      {
        'date': '2023-11-21',
        'temperature': 37.4
      },
      {
        'date': '2023-11-20',
        'temperature': 37.2
      },
      {
        'date': '2023-11-19',
        'temperature': 36.3
      },
      {
        'date': '2023-11-18',
        'temperature': 36.8
      },
      {
        'date': '2023-11-17',
        'temperature': 36.1
      },
      {
        'date': '2023-11-16',
        'temperature': 37.7
      },
      {
        'date': '2023-11-15',
        'temperature': 37.5
      },
      {
        'date': '2023-11-14',
        'temperature': 36.2
      },
      {
        'date': '2023-11-13',
        'temperature': 37.4
      },
      {
        'date': '2023-11-12',
        'temperature': 37
      },
      {
        'date': '2023-11-11',
        'temperature': 36.6
      },
      {
        'date': '2023-11-10',
        'temperature': 36
      },
      {
        'date': '2023-11-09',
        'temperature': 37.2
      },
      {
        'date': '2023-11-08',
        'temperature': 37.3
      },
      {
        'date': '2023-11-07',
        'temperature': 37.1
      },
      {
        'date': '2023-11-06',
        'temperature': 38
      },
      {
        'date': '2023-11-05',
        'temperature': 36.9
      },
      {
        'date': '2023-11-04',
        'temperature': 36.6
      },
      {
        'date': '2023-11-03',
        'temperature': 37.2
      },
      {
        'date': '2023-11-02',
        'temperature': 36
      },
      {
        'date': '2023-11-01',
        'temperature': 36.5
      },
      {
        'date': '2023-10-31',
        'temperature': 36.5
      },
      {
        'date': '2023-10-30',
        'temperature': 37.9
      },
      {
        'date': '2023-10-29',
        'temperature': 37.7
      },
      {
        'date': '2023-10-28',
        'temperature': 36.3
      },
      {
        'date': '2023-10-27',
        'temperature': 36.6
      },
      {
        'date': '2023-10-26',
        'temperature': 36.5
      },
      {
        'date': '2023-10-25',
        'temperature': 36.3
      },
      {
        'date': '2023-10-24',
        'temperature': 37.1
      },
      {
        'date': '2023-10-23',
        'temperature': 37.2
      },
      {
        'date': '2023-10-22',
        'temperature': 37.3
      },
      {
        'date': '2023-10-21',
        'temperature': 37.7
      },
      {
        'date': '2023-10-20',
        'temperature': 37.9
      }
    ]
  }
]

/**
 * Initialize DB with seed data.
 * Seed is a list of patient data with nested medications and temperatures.
 */
export async function initDB(seed: Record<string, unknown>[]) {
  const isInitialized = await db().root(async (root) => (
    Boolean(await root.get(InitializationKey).catch(() => false))
  ))

  if (!isInitialized) {
    for (const patientRaw of seed) {
      const patient = {
        id: typeof patientRaw['name'] === 'string' ? patientRaw['name'].toLowerCase() : '',
        firstName: String(patientRaw['first_name'] ?? ''),
        lastName: String(patientRaw['last_name'] ?? ''),
        age: String(patientRaw['age'] ?? ''),
        height: String(patientRaw['height'] ?? ''),
        weight: String(patientRaw['weight'] ?? ''),
        gender: String(patientRaw['gender'] ?? '')
      }

      await db().patients(async (patients) => {
        await patients.put(patient.id, patient)
      })

      const temperaturesRaw: Record<string, unknown>[] = Array.isArray(patientRaw['body_temperatures']) ?
        patientRaw['body_temperatures']
        : []

      await db().temperatureReadings(patient.id, async (readings) => {
        await readings.batch(temperaturesRaw.map(readingRaw => {
          const id = randomUUID()
          const date = String(readingRaw['date'] ?? '')

          return {
            type: 'put',
            key: date,
            value: {
              id,
              date,
              value: String(readingRaw['temperature'] ?? ''),
            }
          }
        }))
      })

      const medicationsRaw: Record<string, unknown>[] = Array.isArray(patientRaw['medications'])
        ? patientRaw['medications']
        : []

      await db().medications(patient.id, async (medications) => {
        await medications.batch(medicationsRaw.map(medicationRaw => {
          const id = randomUUID()
        
          return {
            type: 'put',
            key: id,
            value: {
              id,
              name: medicationRaw['name'],
              dosage: medicationRaw['dosage'],
              startDate: medicationRaw['start_date'],
              endDate: medicationRaw['end_date'],
            }
          }
        }))
      })
    }

    await db().root(async (root) => {
      await root.put(InitializationKey, '1')
    })
  }
}

export async function register() {
  await initDB(SeedData)
}
