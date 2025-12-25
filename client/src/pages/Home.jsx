import { useNavigate } from 'react-router-dom'
import { FileText, Rows4, BotMessageSquare, Zap, Image } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const cards = [
    { icon: FileText, title: 'Text Summary', desc: 'Summarize Long Text into Short sentence', path: '/summary' },
    { icon: Rows4, title: 'Paragraph', desc: 'Generate Paragraph with words', path: '/paragraph' },
    { icon: BotMessageSquare, title: 'Chatbot', desc: 'Chat with AI Chatbot', path: '/chatbot' },
    { icon: Zap, title: 'JS Converter', desc: 'Translate English to Javascript', path: '/js-converter' },
    { icon: Image, title: 'Sci-Fi Image', desc: 'Generate Sci-Fi Image', path: '/scifi-image' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">AI Explorer</h1>
          <p className="text-xl text-gray-300">Unlock the power of AI with our suite of intelligent tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards && cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                onClick={() => navigate(card.path)}
                className="group bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg p-6 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 border border-purple-700 hover:border-purple-500"
              >
                <div className="text-purple-400 group-hover:text-purple-300 mb-4 transition-colors">
                  <Icon size={40} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{card.desc}</p>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                  Explore →
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home