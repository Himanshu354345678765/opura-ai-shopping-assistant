import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AppHeader from '../components/AppHeader'
import ChatBackground from '../components/ChatBackground'
import ChatMessage from '../components/ChatMessage'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import SidebarChat from '../components/SidebarChat'
import TypingIndicator from '../components/TypingIndicator'
import { useChat } from '../context/ChatContext'

export default function ChatResults() {
  const { messages, products, isLoading, sendMessage, hasConversation } = useChat()
  const scrollAnchor = useRef(null)

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, products])

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-41px)]">
      <ChatBackground />

      <div className="relative z-10 flex flex-col flex-1">
        <AppHeader showClose glass />

        <div className="flex flex-1 overflow-hidden">
          <SidebarChat glass />

          <main className="flex-1 flex flex-col px-4 sm:px-8 py-5 sm:py-6 overflow-y-auto">
            {!hasConversation && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-sm chat-bubble-ai rounded-xl px-4 py-3">
                  Start chatting on{' '}
                  <Link to="/" className="text-primary font-medium hover:underline">
                    Chat Home
                  </Link>
                </p>
              </div>
            )}

            {hasConversation && (
              <div className="flex-1 space-y-4 max-w-3xl mx-auto w-full pb-4">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}

                {isLoading && <TypingIndicator />}

                {products.length > 0 && !isLoading && (
                  <div className="pl-12 animate-fade-in">
                    <ProductGrid products={products} />
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-xs text-gray-500">Tap a product for details</p>
                      <Link
                        to="/compare"
                        className="p-3 rounded-full bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/30 transition-all"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                )}

                <div ref={scrollAnchor} />
              </div>
            )}
          </main>
        </div>

        <SearchBar placeholder="Search here" onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
