export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: Date;
        criteria: string;
    };
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave: {
        startDate: Date;
        endDate: Date;
    };
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;