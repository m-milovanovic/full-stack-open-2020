/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Entry, Gender, Patient, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckRating } from './types';

export const toNewPatient = (object: any): Omit<Patient, 'id'> => {
    const newPatient: Omit<Patient, 'id'> = {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        name: parseField('name', object.name),
        occupation: parseField('occupation', object.occupation),
        ssn: parseField('ssn', object.ssn),
        entries: parseEntries(object.entries)
    };

    return newPatient;
};

export const toNewEntry = (object: any): Omit<Entry, 'id'> => {
    if (!isEntry(object)) {
        throw new Error(`Incorrect entry type`);
    }
    switch (object.type) {
        case "HealthCheck":
            const newEntry1: Omit<HealthCheckEntry, 'id'> = {
                date: parseDate(object.date),
                description: parseField('description', object.description),
                specialist: parseField('specialist', object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return newEntry1;
        case "Hospital":
            if (!object.discharge || !object.discharge.criteria || !object.discharge.date) {
                throw new Error(`Incorrect or missing discharge`);
            }
            const newEntry2: Omit<HospitalEntry, 'id'> = {
                date: parseDate(object.date),
                description: parseField('description', object.description),
                specialist: parseField('specialist', object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                discharge: object.discharge
            };
            return newEntry2;
        case "OccupationalHealthcare":
            if (!object.sickLeave || !object.sickLeave.endDate || !object.sickLeave.startDate) {
                throw new Error(`Incorrect or missing sick leave`);
            }
            const newEntry3: Omit<OccupationalHealthcareEntry, 'id'> = {
                date: parseDate(object.date),
                description: parseField('description', object.description),
                specialist: parseField('specialist', object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                sickLeave: object.sickLeave
            };
            return newEntry3;
    }
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error(`Incorrect or missing rating: ${rating}`);
    }
    return rating;
};

const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseDiagnosisCodes = (codes: any[] | undefined): string[] => {
    if (!codes) {
        return [];
    }
    if (!isCodes(codes)) {
        throw new Error(`Incorrect codes`);
    }
    return codes;
};

const isCodes = (codes: any[]): codes is string[] => {
    for (let i = 0; i < codes.length; i++) {
        if (!isString(codes[i])) {
            return false;
        }
    }
    return true;
};

const parseEntries = (entries: any[]): Entry[] => {
    if (!entries) {
        return [];
    }
    if (!isEntries(entries)) {
        throw new Error(`Incorrect entry`);
    }
    return entries;
};

const isEntries = (entries: any[]): entries is Entry[] => {
    for (let i = 0; i < entries.length; i++) {
        if (!isEntry(entries[i])) {
            return false;
        }
    }
    return true;
};

const isEntry = (entry: any): entry is Entry => {
    if (entry.type === "HealthCheck" ||
        entry.type === "OccupationalHealthcare" ||
        entry.type === "Hospital") {
        return true;
    } else {
        return false;
    }
};

const parseField = (name: string, value: any): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${name}: ${value}`);
    }
    return value;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

