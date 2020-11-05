import React from 'react';
import { Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} rating={entry.healthCheckRating} />;
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return null;
    }
};

export default EntryDetails;