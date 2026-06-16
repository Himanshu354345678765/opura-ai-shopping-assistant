import { User } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-violet-500 to-primary text-white'
            : 'bg-gradient-to-br from-primary to-indigo-600 text-white'
        }`}
      >
        {isUser ? <User size={15} /> : <span className="text-[11px] font-bold">AI</span>}
      </div>

      <div
        className={`max-w-[88%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-primary to-indigo-600 text-white rounded-tr-md'
            : message.isError
              ? 'bg-red-50/90 backdrop-blur text-red-700 border border-red-100 rounded-tl-md'
              : 'chat-bubble-ai text-gray-700 rounded-tl-md'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.source && !message.isError && (
          <p className="text-[10px] text-gray-400/80 mt-2">
            {message.source === 'gemini' && 'Gemini'}
            {message.source === 'wiki' && 'Wikipedia + Opura'}
            {message.source === 'opura' && 'Opura AI'}
          </p>
        )}
      </div>
    </div>
  )
}
