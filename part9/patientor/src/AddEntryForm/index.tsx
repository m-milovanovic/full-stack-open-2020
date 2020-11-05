import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnoses }] = useStateValue();

    const healthCheckValues: Omit<HealthCheckEntry, 'id'> = {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy
    };

    const [initialValues, setInitialValues] = useState<EntryFormValues>(healthCheckValues);

    const click1 = () => {
        setInitialValues(healthCheckValues);
    };

    const click2 = () => {
        const hospitalValues: Omit<HospitalEntry, 'id'> = {
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            type: 'Hospital',
            discharge: {
                criteria: '',
                date: ''
            }
        };
        setInitialValues(hospitalValues);
    };

    const click3 = () => {
        const occupationalHealthcareValues: Omit<OccupationalHealthcareEntry, 'id'> = {
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            type: 'OccupationalHealthcare',
            sickLeave: {
                startDate: '',
                endDate: ''
            }
        };
        setInitialValues(occupationalHealthcareValues);
    };

    return (
        <div>
            <Button color='blue' onClick={click1}>HealthCheck</Button>
            <Button color='blue' onClick={click2}>Hospital</Button>
            <Button color='blue' onClick={click3}>OccupationalHealthcare</Button>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = "Field is required or in wrong format";
                    const errors: { [field: string]: string | { [field: string]: string } } = {};
                    if (!values.date || isNaN(Date.parse(values.date))) {
                        errors.date = requiredError;
                    }
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.diagnosisCodes) {
                        errors.diagnosisCodes = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    switch (values.type) {
                        case "HealthCheck":
                            if (((values as HealthCheckEntry).healthCheckRating) < 0 || ((values as HealthCheckEntry).healthCheckRating) > 3) {
                                errors.healthCheckRating = requiredError;
                            }
                            break;
                        case "Hospital":
                            const criteria = !((values as HospitalEntry).discharge.criteria);
                            const date = !((values as HospitalEntry).discharge.date)
                                || isNaN(Date.parse((values as HospitalEntry).discharge.date));
                            if (!criteria && !date)
                                break;
                            errors.discharge = {
                                criteria: criteria ? requiredError : '',
                                date: date ? requiredError : ''
                            };
                            break;
                        case "OccupationalHealthcare":
                            const startDate = !((values as OccupationalHealthcareEntry).sickLeave.startDate)
                                || isNaN(Date.parse((values as OccupationalHealthcareEntry).sickLeave.startDate));
                            const endDate = !((values as OccupationalHealthcareEntry).sickLeave.endDate)
                                || isNaN(Date.parse((values as OccupationalHealthcareEntry).sickLeave.endDate));
                            if (!startDate && !endDate)
                                break;
                            errors.sickLeave = {
                                startDate: startDate ? requiredError : '',
                                endDate: endDate ? requiredError : ''
                            };
                            break;
                    }
                    console.log(errors);
                    return errors;
                }}
            >
                {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

                    return (
                        <Form className="form ui">
                            <Field
                                label="Description"
                                placeholder="Enter description"
                                name="description"
                                component={TextField}
                            />
                            <DiagnosisSelection
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                diagnoses={Object.values(diagnoses)}
                            />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            {
                                values.type === 'HealthCheck' &&
                                <Field
                                    label="Health Check Rating"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                            }
                            {
                                values.type === 'Hospital' &&
                                <div>
                                    <Field
                                        label="Discharge Date"
                                        placeholder="YYYY-MM-DD"
                                        name="discharge.date"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Criteria"
                                        placeholder="Criteria"
                                        name="discharge.criteria"
                                        component={TextField}
                                    />
                                </div>
                            }
                            {
                                values.type === 'OccupationalHealthcare' &&
                                <div>
                                    <Field
                                        label="Start Date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.startDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="End Date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.endDate"
                                        component={TextField}
                                    />
                                </div>
                            }
                            <Grid>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        floated="right"
                                        color="green"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                </Button>
                                </Grid.Column>
                            </Grid>


                        </Form>
                    );
                }}
            </Formik>
        </div >
    );
};

export default AddEntryForm;