// animated gradient background for chat screens
export default function ChatBackground() {
  return (
    <div className="chat-bg" aria-hidden="true">
      <div className="chat-bg-base" />
      <div className="chat-orb chat-orb-1" />
      <div className="chat-orb chat-orb-2" />
      <div className="chat-orb chat-orb-3" />
      <div className="chat-orb chat-orb-4" />
      <div className="chat-grid" />
    </div>
  )
}
