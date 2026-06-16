import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ChatContext = createContext(null)
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessions, setSessions] = useState([])
  const sendingRef = useRef(false)

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || sendingRef.current) return

    sendingRef.current = true
    setIsLoading(true)

    const userMsg = {
      id: makeId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'assistant',
          content: data.reply,
          timestamp: data.timestamp || new Date().toISOString(),
          source: data.source,
        },
      ])

      setProducts(data.products?.length > 0 ? data.products : [])

      setSessions((prev) => {
        if (prev.some((s) => s.title === trimmed.slice(0, 40))) return prev
        return [
          { id: makeId(), title: trimmed.slice(0, 40), preview: data.reply.slice(0, 60) },
          ...prev.slice(0, 5),
        ]
      })

      return { hasProducts: data.products?.length > 0 }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'assistant',
          content:
            "Can't reach the server right now. Run `npm run dev:all` in the project folder and try again.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ])
      return { error: true }
    } finally {
      setIsLoading(false)
      sendingRef.current = false
    }
  }, [messages])

  const clearChat = useCallback(() => {
    setMessages([])
    setProducts([])
  }, [])

  const value = useMemo(
    () => ({
      messages,
      products,
      isLoading,
      sessions,
      sendMessage,
      clearChat,
      hasConversation: messages.length > 0,
    }),
    [messages, products, isLoading, sessions, sendMessage, clearChat],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used inside ChatProvider')
  return ctx
}
