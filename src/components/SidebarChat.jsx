import { useChat } from '../context/ChatContext'

export default function SidebarChat({ glass = false }) {
  const { sessions, messages } = useChat()

  const items =
    sessions.length > 0
      ? sessions
      : messages.length > 0
        ? messages
            .filter((m) => m.role === 'user')
            .slice(-3)
            .map((m) => ({ id: m.id, title: m.content.slice(0, 40), preview: 'Active conversation' }))
        : [
            { id: 1, title: 'What is AI?', preview: 'General knowledge...' },
            { id: 2, title: 'Find running shoes', preview: 'Under $5000...' },
            { id: 3, title: 'How are you?', preview: 'Casual chat...' },
          ]

  return (
    <aside
      className={
        glass
          ? 'chat-glass-sidebar hidden md:block w-56 lg:w-64 shrink-0 p-4 space-y-3 overflow-y-auto'
          : 'hidden md:block w-56 lg:w-64 shrink-0 border-r border-gray-100 bg-white p-4 space-y-3 overflow-y-auto'
      }
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 p-2 rounded-xl hover:bg-bg-gray cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-medium">AI</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
            <p className="text-xs text-gray-400 truncate">{item.preview}</p>
          </div>
        </div>
      ))}
    </aside>
  )
}
