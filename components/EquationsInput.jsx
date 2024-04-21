"use client";
import { useState } from 'react';

const EquationInput = () => {
    const [numEquations, setNumEquations] = useState(1);
    const [equations, setEquations] = useState([]);

    const handleNumEquationsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumEquations(value);
        const newEquations = [];
        for (let i = 0; i < value; i++) {
            newEquations.push('');
        }
        setEquations(newEquations);
    };

    const handleEquationChange = (e, index) => {
        const newEquations = [...equations];
        newEquations[index] = e.target.value;
        setEquations(newEquations);
    };

    const transformEquations = () => {
        const coefficientsArray = equations.map(eq => {
            // Assuming each equation is in the form ax + by + cz + ... = d
            const parts = eq.split(/[+=]/);
            const coefficients = parts[0].split(/(?=[-+])/).map(term => {
                const coeff = parseFloat(term) || 1;
                return term.includes('-') ? -coeff : coeff;
            });
            const constant = parseFloat(parts[1].trim());
            coefficients.push(constant);
            return coefficients;
        });
        console.log(coefficientsArray);
    };

    return (
        <div>
            <label>Number of Equations:</label>
            <input
                type="number"
                value={numEquations}
                onChange={handleNumEquationsChange}
            />
            {Array.from({ length: numEquations }, (_, index) => (
                <div key={index}>
                    <label>Equation {index + 1}:</label>
                    <input
                        type="text"
                        value={equations[index]}
                        onChange={(e) => handleEquationChange(e, index)}
                    />
                </div>
            ))}
            <button onClick={transformEquations}>Transform</button>
        </div>
    );
};

export default EquationInput;
