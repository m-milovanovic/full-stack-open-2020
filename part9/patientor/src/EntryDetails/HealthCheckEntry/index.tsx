import React from 'react';
import { Entry, HealthCheckRating } from '../../types';

const HealthCheckEntry: React.FC<{ entry: Entry; rating: HealthCheckRating }> = ({ entry, rating }) => {

    return (
        <div className="ui segment">
            <h3>{entry.date} <i className='user md icon'/></h3>
            <div>
                <p>{entry.description}</p>
            </div>
            <div>
                {
                    rating === HealthCheckRating.Healthy && <i className="green heart icon"/>
                }
                {
                    rating === HealthCheckRating.LowRisk && <i className="yellow heart icon"/>
                }
                {
                    rating === HealthCheckRating.HighRisk && <i className="brown heart icon"/>
                }
                {
                    rating === HealthCheckRating.CriticalRisk && <i className="black heart icon"/>
                }
            </div>
        </div>
    );
};

export default HealthCheckEntry;