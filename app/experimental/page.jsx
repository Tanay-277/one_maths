"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MathJax, { MathJaxContext } from "better-react-mathjax";

export default function Page() {
    const samplePrompt = `
    Write the equations for the Gauss-Jacobi problem.
    Check if the equations are diagonally dominant. If not, modify them to ensure diagonal dominance.
    Express the equations in terms of variables.
    Perform iterations to solve the problem.
    equations are x-y+z=10, -x+3y-2z=5, 3x+2y+8z=6
    `
    const [promt, setPromt] = useState(samplePrompt);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_URl);

    const handleGenerate = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(promt);
        const res = await result.response;
        setResponse(res.text());
    }

    return (
        <div>
            <textarea value={promt} onChange={(e) => setPromt(e.target.value)} cols={80} />
            <br />
            <button onClick={handleGenerate}>Generate</button>
            {loading && <p>Loading...</p>}
            <pre style={{ fontFamily: "monospace" }}>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {response}
                </Markdown>
            </pre>
        </div>
    );
}




