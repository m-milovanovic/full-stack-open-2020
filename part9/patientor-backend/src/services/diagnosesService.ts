import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = () : Diagnosis[] => {
    return diagnosesData;
};

export default {
    getDiagnoses
};