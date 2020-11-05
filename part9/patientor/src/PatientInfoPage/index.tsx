import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../EntryDetails";
import AddEntryForm, { EntryFormValues } from "../AddEntryForm";

const PatientInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();

    const fetchPatient = useCallback(async () => {
        try {
            const { data: patient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setPatient(patient));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (patient?.id !== id) {
            fetchPatient();
        }
    }, [id, patient, dispatch, fetchPatient]);

    const onSubmit = async (values: EntryFormValues) => {
        try {
            await axios.post(`${apiBaseUrl}/patients/${id}/entries`, { ...values });
            fetchPatient();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="App">

            <h2>
                {patient?.name}
                {
                    patient?.gender === Gender.Male && <i className="mars icon" />
                }
                {
                    patient?.gender === Gender.Female && <i className="venus icon" />
                }
                {
                    patient?.gender === Gender.Other && <i className="neuter icon" />
                }
            </h2>
            <div>ssn: {patient?.ssn}</div>
            <div>occupation {patient?.occupation}</div>
            <AddEntryForm onSubmit={onSubmit} />
            <h2>entries</h2>
            {
                patient?.entries?.map(entry => <EntryDetails key={entry.id} entry={entry} />)
            }
        </div>
    );
};

export default PatientInfoPage;