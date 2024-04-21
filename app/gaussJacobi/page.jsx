"use client";
import { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const GaussJacobi = () => {
    const temp = ["x + 2y + 3z = 6", "2x + 3y + z = 4", "3x + y + 2z = 2"];
    const [numOfEquations, setNumOfEquations] = useState(temp.length);
    const [equations, setEquations] = useState(temp);
    const [coefficients, setCoefficients] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    const [initialValues, setInitialValues] = useState([0, 0, 0]);
    const [presicion, setPresicion] = useState(0.0001);
    const [result, setResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");

    const handleNumOfEquations = (e) => {
        setNumOfEquations(e.target.value);
        setEquations([]);
        setInitialValues([]);
        setResult([]);
        setError("");
    }

    const handleEquations = (e) => {
        const temp = [...equations];
        temp[e.target.id] = e.target.value;
        setEquations(temp);
    }

    const transformEquation = (equation, eqNum) => {
        const terms = equation.replace(/\s/g, '').split(/(?=[=+-])/);
        let newCoefficients = [0, 0, 0, 0];

        terms.forEach(term => {
            if (term.includes("x")) {
                if (term === "x" || term === "+x") {
                    newCoefficients[0] = 1;
                }
                else if (term === "-x") {
                    newCoefficients[0] = -1;
                }
                else {
                    newCoefficients[0] = parseFloat(term.replace("x", ""));
                }

            } else if (term.includes("y")) {
                if (term === "y" || term === "+y") {
                    newCoefficients[1] = 1;
                }
                else if (term === "-y") {
                    newCoefficients[1] = -1;
                }
                else {
                    newCoefficients[1] = parseFloat(term.replace("y", ""));
                }
            } else if (term.includes("z")) {
                if (term === "z" || term === "+z") {
                    newCoefficients[2] = 1;
                }
                else if (term === "-z") {
                    newCoefficients[2] = -1;
                }
                else {
                    newCoefficients[2] = parseFloat(term.replace("z", ""));
                }
            } else {
                newCoefficients[3] = parseFloat(term.replace("=", ""));
            }
        });

        // Ensure the constant term is negative
        if (newCoefficients[3] > 0) {
            newCoefficients[3] = -newCoefficients[3];
        }

        console.log("coefficients = ", newCoefficients);
        setCoefficients(prevCoefficients => {
            const newCoefficientsArray = [...prevCoefficients];
            newCoefficientsArray[eqNum] = newCoefficients;
            return newCoefficientsArray;
        });
    };



    const handleInitialValues = (e) => {
        setInitialValues(e.target.value.split(","));
    }

    const handlePresicion = (e) => {
        setPresicion(e.target.value);
    }


    const handleSubmit = () => {

        // reset everything
        setResult([]);
        setError("");
        setCoefficients([0, 0, 0, 0]);
        setShowResult(true);


        if (equations.length < numOfEquations) {
            setError("Please fill all equations");
            return;
        }
        if (initialValues.length < numOfEquations) {
            setError("Please fill all initial values");
            return;
        }

        transformEquation(equations[0], 0);
        transformEquation(equations[1], 1);
        transformEquation(equations[2], 2);
    }
    return (
        <>
            <h1>Gauss Jacobi</h1>
            <div>
                <label>Number of equations:</label>
                <input type="number" value={numOfEquations} onChange={handleNumOfEquations} />
            </div>
            <div>
                <label>Equations:</label>
                {Array.from({ length: numOfEquations }, (_, i) => (
                    <input key={i} id={i} type="text" value={equations[i]} onChange={handleEquations} />
                ))}
            </div>
            <div>

                <label>Initial values:</label>
                <input type="text" value={initialValues} onChange={handleInitialValues} />
            </div>
            <div>
                <label>Presicion:</label>
                <input type="number" value={presicion} onChange={handlePresicion} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {error && <p>{error}</p>}
            {/* {showResult && */}

            <>
                <h3>Solution</h3>
                <MathJaxContext>
                    {
                        equations.map((equation, index) => (
                            <MathJax key={index}>{equation}</MathJax>
                        ))
                    }
                    {
                        Array.from({ length: numOfEquations }, (_, i) => (
                            <p key={i}>
                                {
                                    `x = (${coefficients[i][3]} - ${coefficients[i][1]}y - ${coefficients[i][2]}z) / ${coefficients[i][0]}`
                                }
                            </p>
                        ))
                    }



                </MathJaxContext>
            </>
            {/* } */}
        </>
    )

}

export default GaussJacobi;
