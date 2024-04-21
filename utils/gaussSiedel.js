// utils/gaussSeidel.js
export function gaussSeidel(A, b, x, N, tol) {
    const maxIterations = 1000000;
    const xprev = new Array(N).fill(0);

    for (let i = 0; i < maxIterations; i++) {
        for (let j = 0; j < N; j++) {
            xprev[j] = x[j];
        }

        for (let j = 0; j < N; j++) {
            let summ = 0.0;
            for (let k = 0; k < N; k++) {
                if (k !== j) {
                    summ += A[j][k] * x[k];
                }
            }
            x[j] = (b[j] - summ) / A[j][j];
        }

        let diff1norm = 0.0;
        let oldnorm = 0.0;

        for (let j = 0; j < N; j++) {
            diff1norm += Math.abs(x[j] - xprev[j]);
            oldnorm += Math.abs(xprev[j]);
        }

        if (oldnorm === 0.0) {
            oldnorm = 1.0;
        }

        const norm = diff1norm / oldnorm;

        if (norm < tol && i !== 0) {
            let result = "Sequence converges to [";
            for (let j = 0; j < N - 1; j++) {
                result += x[j] + ", ";
            }
            result += x[N - 1] + "]. Took " + (i + 1) + " iterations.";
            return result;
        }
    }

    return "Doesn't converge.";
}
