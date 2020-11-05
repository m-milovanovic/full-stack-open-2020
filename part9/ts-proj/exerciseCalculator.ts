export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (hours: Array<number>, target: number): Result => {
    let rating: number;
    let ratingDescription: string;
    let periodLength: number = hours.length;
    let trainingDays: number = hours.filter(h => h > 0).length

    let numberOfHoursMet: number = hours.filter(h => h >= target).length;
    if (numberOfHoursMet < 0.5 * periodLength) {
        rating = 1;
        ratingDescription = 'not good mate';
    } else if (numberOfHoursMet < periodLength) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'great';
    }

    return {
        periodLength,
        trainingDays: hours.filter(h => h > 0).length,
        success: periodLength == trainingDays,
        rating,
        ratingDescription,
        target,
        average: hours.reduce((a, b) => a + b, 0) / periodLength
    }
}

interface ExerciseValues {
    hours: Array<number>;
    target: number;
}

const parseArgumentsExercise = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let target: number = Number(args[2])
    if (isNaN(target)) throw new Error('Provided values were not numbers!');

    let hours: Array<number> = [];

    for (let i = 3; i < args.length; i++) {
        let hour: number = Number(args[i])
        if (isNaN(hour)) {
            throw new Error('Provided values were not numbers!');
        } else {
            hours.push(hour)
        }
    }

    return {
        hours,
        target
    }
}

try {
    const { hours, target } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(hours, target));
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

