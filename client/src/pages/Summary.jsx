import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Summary = () => {
  const navigate = useNavigate()
  const [text, setText] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await axios.post('/api/v1/openai/summary', { text })
      setSummary(data)
    } catch (err) {
      setError('Failed to fetch summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Text Summarizer</h1>
          <p className="text-purple-300">Transform your content into concise summaries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-3">Enter Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full h-40 p-4 bg-slate-800 border-2 border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none transition-colors"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border-l-4 border-red-500 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!text.trim() || loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </form>

        {summary && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500 rounded-lg p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
              <div className="bg-slate-900 rounded p-4 text-gray-200 leading-relaxed">
                {summary}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Summary