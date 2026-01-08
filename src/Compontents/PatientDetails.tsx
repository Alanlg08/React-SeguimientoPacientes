import { type Patient } from "../types"
import PatientDetaillItem from "./PatientDetaillItem"
import { usePatientStore } from "../Store/store"
import { toast } from 'react-toastify'


type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient} : PatientDetailsProps) {

    const deletePatient = usePatientStore(state => state.deletePatient)
    const getPatientById = usePatientStore(state => state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente Eliminado')
    }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetaillItem
            label="ID"
            data={patient.id}
        />
        <PatientDetaillItem
            label="Nombre"
            data={patient.name}
        />
        <PatientDetaillItem
            label="Propietario"
            data={patient.caretaker}
        />
        <PatientDetaillItem
            label="Email"
            data={patient.email}
        />
        <PatientDetaillItem
            label="Fecha Alta"
            data={patient.date.toString()}
        />
        <PatientDetaillItem
            label="Sintomas"
            data={patient.symptoms}
        />

        <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
            <button 
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
            onClick={()=> getPatientById(patient.id)}>
                Editar
            </button>
            <button 
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
            onClick={handleClick}>
                Eliminar
            </button>
        </div>
    </div>
  )
}
