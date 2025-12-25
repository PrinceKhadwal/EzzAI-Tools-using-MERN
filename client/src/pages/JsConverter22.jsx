import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JsConverter = () => {
    const [text, setText] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/openai/js-converter", {
                text,
            });
            setCode(data);
        } catch (err) {
            if (err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">JS Converter</h1>
            {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <textarea
                    placeholder="Add your text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Convert
                </button>
            </form>
            <p className="mt-4">
                Not this tool? <Link to="/" className="text-blue-500">GO BACK</Link>
            </p>
            {code ? (
                <div className="mt-4 p-4 border border-gray-300 rounded bg-white shadow-md">
                    <pre>{code}</pre>
                </div>
            ) : (
                <div className="mt-4 p-4 border border-gray-300 rounded bg-white shadow-md">
                    <p className="text-center text-gray-500">Your Code Will Appear Here</p>
                </div>
            )}
        </div>
    );
};

export default JsConverter;
