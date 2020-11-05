/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientsService from '../services/patientsService';
import { Entry, Patient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const patient: Omit<Patient, 'id'> = toNewPatient(req.body);
        res.json(patientsService.createPatient(patient));
    } catch (e) {
        res.status(400).send(e.message);
    }

});

router.post('/:id/entries', (req, res) => {
    try {
        const entry: Omit<Entry, 'id'> = toNewEntry(req.body);
        res.json(patientsService.createEntry(req.params.id, entry));
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    res.json(patientsService.getPatient(req.params.id));
});


export default router;