import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
    let height: number = Number(req.query.height);
    let weight: number = Number(req.query.weight);


    if (isNaN(height) || isNaN(weight)) {
        res.json({
            error: "malformatted parameters"
        });
    } else {
        res.json({
            height,
            weight,
            bmi: calculateBmi(height, weight)
        });
    }
});

app.post('/exercise', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
    } else {
        daily_exercises.forEach((el: number) => {
            if (isNaN(Number(el))) {
                res.json({ error: "malformatted parameters" });
                return;
            }
        });
        res.json(calculateExercises(daily_exercises, target))
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});