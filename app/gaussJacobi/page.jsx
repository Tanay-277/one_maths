"use client";
import { useState, useEffect, use } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import IterationBox from "@/components/IterationBox";
import { motion } from "framer-motion";

const GaussJacobi = () => {


    useEffect(() => {
        document.title = "Gauss Jacobi";
    }, []);

    const config = {
        loader: { load: ["input/asciimath"] }
    };

    const temp = ["x + 2y + 3z = 6", "2x + 3y + z = 4", "3x + y + 2z = 2"];
    const [numOfEquations, setNumOfEquations] = useState(temp.length);
    const [equations, setEquations] = useState(temp);
    const [numOfIterations, setNumOfIterations] = useState(3);
    const [coefficients, setCoefficients] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    const [initialValues, setInitialValues] = useState([0, 0, 0]);
    const [presicion, setPresicion] = useState(4);
    const [error, setError] = useState("");
    const [result, setResult] = useState([]);
    const [showCalc, setShowCalc] = useState(true);
    const [showSol, setShowSol] = useState(false);
    const [mathJaxKey, setMathJaxKey] = useState(0);

    const handleNumOfEquations = (e) => {
        setNumOfEquations(e.target.value);
        setEquations([]);
        setInitialValues([]);
        setResult([]);
        setNumOfIterations(e.target.value);
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

        if (newCoefficients[3] > 0) {
            newCoefficients[3] = -newCoefficients[3];
        }

        // console.log("coefficients = ", newCoefficients);
        setCoefficients(prevCoefficients => {
            const newCoefficientsArray = [...prevCoefficients];
            newCoefficientsArray[eqNum] = newCoefficients;
            return newCoefficientsArray;
        });
    };

    const handleNumOfIterations = (e) => {
        setNumOfIterations(e.target.value);
    }

    const handleInitialValues = (e) => {
        setInitialValues(e.target.value.split(","));
    }

    const handlePresicion = (e) => {
        setPresicion(e.target.value);
    }

    const handleSubmit = () => {
        setShowSol(true);
        setResult([]);
        setError("");
        setCoefficients([0, 0, 0, 0]);


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

    const handleReset = () => {
        setNumOfEquations(1);
        setEquations([]);
        setInitialValues([]);
        setPresicion(4);
        setResult([]);
        setShowResult(false);
        setError("");
        setNumOfIterations(0);
        setCoefficients([0, 0, 0, 0]);
        setPresicion(0);
    }

    useEffect(() => {
        setMathJaxKey(prevKey => prevKey + 1);
    }, [equations, coefficients, initialValues, numOfIterations, presicion]);

    return (
        <>
            <div className="main pt-4 pb-1 mx-10 rounded-b-[3rem]">
                <h1 className="text-right text-6xl font-medium space text-[#ffffff8c] mr-6 mb-2">Gauss Jacobi</h1>
                <div className="hero flex gap-6 px-6 py- my-2">
                    <div className="flex flex-col gap-4 w-1/2 heroChild">
                        <div>
                            <label className="ml-2">Number of equations</label><br />
                            <input type="number" value={numOfEquations} onChange={handleNumOfEquations} />
                        </div>
                        <div>
                            <label className="ml-2">Equations</label>
                            {Array.from({ length: numOfEquations }, (_, i) => (
                                <div key={i}>
                                    <input key={i} id={i} type="text" value={equations[i]} onChange={handleEquations} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col w-1/2 justify-between heroChild">
                        <div>
                            <label className="ml-2">Number Of Iterations</label><br />
                            <input type="number" value={numOfIterations} onChange={handleNumOfIterations} />
                        </div>
                        <div>

                            <label className="ml-2">Initial values</label><br />
                            <input type="text" value={initialValues} onChange={handleInitialValues} />
                        </div>
                        <div>
                            <label className="ml-2">Presicion (Number of Digits after decimal)</label><br />
                            <input type="number" value={presicion} onChange={handlePresicion} />
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center mt-2 px-6 gap-6">
                    <button className="justify-center flex w-1/2 py-2 px-6 rounded-full border-[0.1px] border-[#ffffff1a] bg-[#00000054] hover:bg-[#00000012]" onClick={handleSubmit}>Solve</button>
                    <button className="justify-center flex w-1/2 py-2 px-6 rounded-full border-[0.1px] border-[#ffffff1a] bg-[#e454d110] hover:bg-[#00000054]" onClick={handleReset}>Reset</button>
                </div>
                <div className="flex w-full items-center justify-center my-2 px-6" >
                    <button className="justify-center flex w-2/5 py-2 px-6 rounded-full  hover:bg-[#aad7f136]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            {showSol &&
                <div className="pt-4 my-4 mx-6">
                    <h3 className="text-3xl font-semibold mt-6 mb-4 text-white">Solution</h3>
                    <div className="py-3 rounded-md text-lg">
                        Given, <br />
                        <MathJaxContext config={config} key={mathJaxKey}>
                            {equations.map((equation, index) => (
                                <MathJax key={index}>{equation}</MathJax>
                            ))}
                            <>
                                <h3 className="mt-4">Therefore</h3>
                                <MathJax className="mt-2">{"`" +
                                    `x = \\frac{${coefficients[0][3]} - ${coefficients[0][1]}y - ${coefficients[0][2]}z}{${coefficients[0][0]}}` +
                                    "`"}
                                </MathJax>
                                <MathJax className="mt-2">{"`" +
                                    `y = \\frac{${coefficients[1][3]} - ${coefficients[1][0]}x - ${coefficients[1][2]}z}{${coefficients[1][1]}}` +
                                    "`"}
                                </MathJax>
                                <MathJax className="mt-2">{"`" +
                                    `z = \\frac{${coefficients[2][3]} - ${coefficients[2][0]}x - ${coefficients[2][1]}y}{${coefficients[2][2]}}` +
                                    "`"}
                                </MathJax>
                            </>
                        </MathJaxContext>
                    </div>
                    <div className="py-3 rounded-md mb-3 text-lg">
                        <MathJaxContext config={config} key={mathJaxKey}>
                            <IterationBox
                                coefficients={coefficients}
                                initialValues={initialValues}
                                numOfIterations={numOfIterations}
                                presicion={presicion}
                            />
                        </MathJaxContext>
                    </div>
                </div>
            }


            {/* } */}
        </>
    )

}

export default GaussJacobi;
