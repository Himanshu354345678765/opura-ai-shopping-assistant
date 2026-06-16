import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import ChatBackground from '../components/ChatBackground'
import SearchBar from '../components/SearchBar'
import SidebarPlaceholder from '../components/SidebarPlaceholder'
import { useChat } from '../context/ChatContext'

const suggestions = [
  'What is artificial intelligence?',
  'Find running shoes under $5000',
  'Tell me about Nike',
  'What is 25 * 4?',
  'Show casual sneakers on sale',
  'How are you?',
]

export default function ChatHome() {
  const navigate = useNavigate()
  const { sendMessage, isLoading, hasConversation } = useChat()

  const handleSend = async (text) => {
    const result = await sendMessage(text)
    if (!result?.error) navigate('/chat-results')
  }

  useEffect(() => {
    if (hasConversation) navigate('/chat-results', { replace: true })
  }, [hasConversation, navigate])

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-41px)]">
      <ChatBackground />

      <div className="relative z-10 flex flex-col flex-1">
        <AppHeader glass />

        <div className="flex flex-1 overflow-hidden">
          <SidebarPlaceholder glass />

          <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-12">
            <div className="text-center max-w-xl">
              <h1 className="greeting-glow text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                Hello Opura
              </h1>
              <p className="text-base sm:text-xl text-gray-600/90 mb-8">
                How can I help you today?
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSend(s)}
                    disabled={isLoading}
                    className="suggestion-chip text-xs sm:text-sm px-3 py-2 rounded-full text-gray-600 disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>

        <SearchBar onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  )
}
