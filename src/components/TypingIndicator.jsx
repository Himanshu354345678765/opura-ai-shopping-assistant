export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-600 shrink-0 flex items-center justify-center">
        <span className="text-white text-[11px] font-bold">AI</span>
      </div>
      <div className="chat-bubble-ai rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
        <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  )
}
