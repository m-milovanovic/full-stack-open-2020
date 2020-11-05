import React from 'react';
import { Entry } from '../../types';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div className='ui segment'>
            <h3>{entry.date} <i className='stethoscope icon' /></h3>
            <div>
                <p>{entry.description}</p>
            </div>
        </div>
    );
};

export default OccupationalHealthcareEntry;