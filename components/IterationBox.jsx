import { MathJax } from "better-react-mathjax";

const IterationBox = ({ coefficients, initialValues, numOfIterations, presicion }) => {
    let x = initialValues[0];
    let y = initialValues[1];
    let z = initialValues[2];
    // console.log(presicion);

    const iterations = [];
    const iterationAnswers = [];


    for (let i = 0; i < numOfIterations; i++) {
        const newX = parseFloat(((coefficients[0][3] - coefficients[0][1] * y - coefficients[0][2] * z) / coefficients[0][0]).toFixed(presicion));
        const newY = parseFloat(((coefficients[1][3] - coefficients[1][0] * x - coefficients[1][2] * z) / coefficients[1][1]).toFixed(presicion));
        const newZ = parseFloat(((coefficients[2][3] - coefficients[2][0] * x - coefficients[2][1] * y) / coefficients[2][2]).toFixed(presicion));

        iterations.push(
            <div key={i} className="my-6">
                <h3 className="my-1">Iteration-{i + 1}</h3>
                <MathJax className="my-2">
                    {"`" + `
                        x_{${i + 1}} = \\frac{${coefficients[0][3]} - ${coefficients[0][1]}y_{${i}} - ${coefficients[0][2]}z_{${i}}}{${coefficients[0][0]}}
                        = \\frac{${coefficients[0][3]} - ${coefficients[0][1]}(${y}) - ${coefficients[0][2]}(${z})}{${coefficients[0][0]}}
                        = ${newX}
                    ` + "`"}
                </MathJax>
                <MathJax className="my-2">
                    {"`" + `
                        y_{${i + 1}} = \\frac{${coefficients[1][3]} - ${coefficients[1][0]}x_{${i}} - ${coefficients[1][2]}z_{${i}}}{${coefficients[1][1]}}
                        = \\frac{${coefficients[1][3]} - ${coefficients[1][0]}(${x}) - ${coefficients[1][2]}(${z})}{${coefficients[1][1]}}
                        = ${newY}
                    ` + "`"}
                </MathJax>
                <MathJax className="my-2">
                    {"`" + `
                        z_{${i + 1}} = \\frac{${coefficients[2][3]} - ${coefficients[2][0]}x_{${i}} - ${coefficients[2][1]}y_{${i}}}{${coefficients[2][2]}}
                        = \\frac{${coefficients[2][3]} - ${coefficients[2][0]}(${x}) - ${coefficients[2][1]}(${y})}{${coefficients[2][2]}}
                        = ${newZ}
                    ` + "`"}
                </MathJax>
            </div>
        );

        x = newX;
        y = newY;
        z = newZ;
        iterationAnswers.push({ iteration: i + 1, x, y, z });

    }
    // console.log(iterations);
    return (
        <MathJax>
            <div>
                <h3 className="mt-6 mb-2">
                    Initially, x<sub>0</sub> = {initialValues[0]},
                    y<sub>0</sub> = {initialValues[1]},
                    z<sub>0</sub> = {initialValues[2]}
                </h3>
                {iterations}
            </div>
            <p className="underline p-2 px-4  w-full " style={{ margin: '20px 0' }}>
                The solution is x = {x}, y = {y}, z = {z}
            </p>
            <table className="table-auto border border-collapse border-gray-700 my-6 rounded-md">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 px-4 py-2">Iteration</th>
                        <th className="border border-gray-700 px-4 py-2">x</th>
                        <th className="border border-gray-700 px-4 py-2">y</th>
                        <th className="border border-gray-700 px-4 py-2">z</th>
                    </tr>
                </thead>
                <tbody>
                    {iterationAnswers.map((iteration, index) => (
                        <tr key={index} className="hover:bg-gray-900">
                            <td className="border border-gray-700 px-4 py-2 text-center">{iteration.iteration}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{iteration.x}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{iteration.y}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{iteration.z}</td>
                        </tr>
                    ))}


                </tbody>

            </table>

        </MathJax>
    );
};

export default IterationBox;
