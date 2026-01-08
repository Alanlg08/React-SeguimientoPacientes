import { create } from 'zustand'
import type { DraftPatient, Patient } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { devtools, persist } from 'zustand/middleware'

type PatientsState = {
    patients: Patient[]

    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id:Patient['id']) => void
    updatePatient: (data: DraftPatient) => void

}

// con esta funcion ya generamos un paciente como en DraftPatient, pero le agregamos el ID usando uuid
const createPatient = (patient: DraftPatient) : Patient => {
    return {...patient, id: uuidv4() }
}

//Le agregagoms el PatientsState en forma de generico para que el arreglo sea de type Patient
export const usePatientStore = create<PatientsState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: '',
        addPatient: (data) => {
          const newPatient = createPatient(data)
          set((state) => ({
            patients: [...state.patients, newPatient]
          }))
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)
          }))
        },
        getPatientById: (id) => {
          set(() => ({
            activeId: id
          }))
        },
        updatePatient: (data) => {
          set((state) => ({
            //iteramos sobre los pacientes, identificamos el que estamos editando y guardamos lo que tenemos en data, si no, reotrnamos otra vez los pacientes
            patients: state.patients.map(patient =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            //reiniciamos el activeId para que no quede guardado y no se edite siempre el cliente
            activeId: ''
          }))
        }
      }), {
        //persisted y el nombre nos sirve para poder agregar localstorage
        name: 'patient-storage'
      }
    )
  )
)


