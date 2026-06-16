import { useChat } from '../context/ChatContext'

export default function SidebarPlaceholder({ glass = false }) {
  const { sessions } = useChat()
  const sidebarClass = glass
    ? 'chat-glass-sidebar hidden md:block w-56 lg:w-64 shrink-0 p-4 space-y-3 overflow-y-auto'
    : 'hidden md:block w-56 lg:w-64 shrink-0 border-r border-gray-100 bg-white p-4 space-y-3 overflow-y-auto'

  if (sessions.length === 0) {
    return (
      <aside className={sidebarClass}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-gray-200"
            style={{ width: `${70 + (i % 3) * 10}%` }}
          />
        ))}
      </aside>
    )
  }

  return (
    <aside className={sidebarClass}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Recent Chats
      </p>
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-start gap-3 p-2 rounded-xl hover:bg-bg-gray cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-medium">AI</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{session.title}</p>
            <p className="text-xs text-gray-400 truncate">{session.preview}</p>
          </div>
        </div>
      ))}
    </aside>
  )
}
