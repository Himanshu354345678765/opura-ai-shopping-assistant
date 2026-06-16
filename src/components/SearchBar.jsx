import { Mic, Plus, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function SearchBar({ placeholder = 'Search here', onSend, isLoading = false }) {
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const recognition = useRef(null)

  const submit = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading || !onSend) return
    const text = input.trim()
    setInput('')
    await onSend(text)
  }

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      alert('Voice works best in Chrome or Edge')
      return
    }

    if (listening) {
      recognition.current?.stop()
      return
    }

    const rec = new SR()
    rec.lang = 'en-US'
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.onresult = (e) => setInput(e.results[0][0].transcript)
    recognition.current = rec
    rec.start()
  }

  useEffect(() => () => recognition.current?.stop(), [])

  return (
    <div className="relative z-10 px-4 sm:px-6 py-4">
      <form
        onSubmit={submit}
        className="chat-input-box flex items-center gap-2 max-w-3xl mx-auto rounded-2xl px-4 py-3"
      >
        <button type="button" className="p-2 rounded-lg text-gray-400 hover:bg-white/80 shrink-0">
          <Plus size={18} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit(e)
            }
          }}
          placeholder={isLoading ? 'Thinking...' : placeholder}
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-primary text-white hover:brightness-110 transition-all disabled:opacity-40 shadow-md shadow-primary/25"
        >
          <Send size={16} />
        </button>
        <button
          type="button"
          onClick={startVoice}
          disabled={isLoading}
          className={`p-2.5 rounded-xl transition-all ${
            listening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/60 text-gray-500 hover:bg-white'
          }`}
        >
          <Mic size={16} />
        </button>
      </form>
    </div>
  )
}
