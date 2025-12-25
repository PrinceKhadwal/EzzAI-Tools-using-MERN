import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ScifiImage = () => {
    const [text, settext] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/v1/openai/scifi-image", { text });
            setImage(data);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 animate-in fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl shadow-2xl p-8 mb-6">
                    <h1 className="text-4xl font-bold text-white mb-8">Sci-Fi Image Generator</h1>

                    <textarea
                        placeholder="Describe your sci-fi image..."
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                        required
                        className="w-full p-4 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 resize-none h-32 mb-6"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
                    >
                        {loading ? "Generating..." : "Generate Image"}
                    </button>

                    <Link to="/" className="block text-center text-blue-400 hover:text-blue-300 transition">
                        ← Back to Home
                    </Link>
                </form>

                <div className="bg-slate-800 rounded-xl shadow-2xl p-8 h-96 flex items-center justify-center border border-slate-700">
                    {image ? (
                        <img src={image} alt="Generated sci-fi" className="max-w-full max-h-full rounded-lg" />
                    ) : (
                        <p className="text-slate-400 text-lg text-center">Your generated sci-fi image will appear here</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScifiImage;