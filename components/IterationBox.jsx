import { MathJax } from "better-react-mathjax";

const IterationBox = ({ coefficients, initialValues, numOfIterations, presicion }) => {
    let x = initialValues[0];
    let y = initialValues[1];
    let z = initialValues[2];
    console.log(presicion);

    const iterations = [];

    for (let i = 0; i < numOfIterations; i++) {
        const newX = parseFloat(((coefficients[0][3] - coefficients[0][1] * y - coefficients[0][2] * z) / coefficients[0][0]).toFixed(presicion));
        const newY = parseFloat(((coefficients[1][3] - coefficients[1][0] * x - coefficients[1][2] * z) / coefficients[1][1]).toFixed(presicion));
        const newZ = parseFloat(((coefficients[2][3] - coefficients[2][0] * x - coefficients[2][1] * y) / coefficients[2][2]).toFixed(presicion));

        iterations.push(
            <div key={i}>
                <h3>Iteration-{i + 1}</h3>
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
    }

    return (
        <MathJax>
            <div>
                <h3 className="mt-6">
                    Initially, x<sub>0</sub> = {initialValues[0]},
                    y<sub>0</sub> = {initialValues[1]},
                    z<sub>0</sub> = {initialValues[2]}
                </h3>
                {iterations}
            </div>
            {/* show result here */}
            <p>
                The solution is x = {x}, y = {y}, z = {z}
            </p>
            {/* show a table for each variable and for each iteration */}
            <table className="table-auto border border-collapse border-gray-400 my-6 mx-auto">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-400 px-4 py-2">Iteration</th>
                        <th className="border border-gray-400 px-4 py-2">x</th>
                        <th className="border border-gray-400 px-4 py-2">y</th>
                        <th className="border border-gray-400 px-4 py-2">z</th>
                    </tr>
                </thead>
                <tbody>
                    {iterations.map((iteration, index) => (
                        <tr key={index} className="hover:bg-gray-900">
                            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-400 px-4 py-2">{iteration.x}</td>
                            <td className="border border-gray-400 px-4 py-2">{iteration.y}</td>
                            <td className="border border-gray-400 px-4 py-2">{iteration.z}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </MathJax>
    );
};

export default IterationBox;
