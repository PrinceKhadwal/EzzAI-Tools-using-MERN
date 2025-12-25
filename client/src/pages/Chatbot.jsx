import { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

const ChatBot = () => {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/v1/openai/chatbot", { text });
            setResponse(data);
            setError("");
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message;
            setError(errorMsg);
            setTimeout(() => setError(""), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-2/5 p-8 m-8 mx-auto rounded-lg shadow-lg bg-white">
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Ask with Chatbot</h1>

                <textarea
                    placeholder="Add your text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Chatting..." : "Chat"}
                </button>

                <p className="text-center text-gray-600">
                    Not this tool? <Link to="/" className="text-blue-600 hover:underline">GO BACK</Link>
                </p>
            </form>

            <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50 h-96 overflow-y-auto">
                {response ? (
                    <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
                ) : (
                    <p className="text-center text-gray-400 leading-96 flex items-center justify-center h-full">
                        Bot Response
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatBot;