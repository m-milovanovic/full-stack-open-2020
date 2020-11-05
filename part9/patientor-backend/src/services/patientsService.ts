import data from '../../data/patients.json';
import { Entry, Patient, PublicPatient } from '../types';
import { toNewPatient } from '../utils';

const patientsData: Patient[] = data.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getPatient = (id: string): Patient => {
    return patientsData.filter(patient => patient.id === id)[0];
};

const getPatients = (): PublicPatient[] => {
    return patientsData;
};

const createPatient = (patient: Omit<Patient, 'id'>): Patient => {
    const newPatient: Patient = { ...patient, id: (patientsData.length + 1).toString() };
    patientsData.push(newPatient);
    return newPatient;
};

const createEntry = (id: string, entry: Omit<Entry, 'id'>): Entry => {
    const patient: Patient = getPatient(id);
    if (!patient) {
        throw new Error(`Patient not found`);
    }
    const newEntry: Entry = { ...entry, id: (patient.entries.length + 1).toString() } as Entry;
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatient,
    getPatients,
    createPatient,
    createEntry
};