import { Link, useNavigate } from 'react-router-dom'
import { Minus, X } from 'lucide-react'

export default function AppHeader({ showClose = false, glass = false }) {
  const navigate = useNavigate()

  return (
    <header
      className={`relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 ${
        glass ? 'chat-glass-header' : 'border-b border-gray-100 bg-white'
      }`}
    >
      <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">O</span>
        </div>
        <span className="text-base sm:text-lg font-semibold text-gray-900">Opura AI</span>
      </Link>

      <div className="flex items-center gap-2">
        {showClose && (
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}
        <button
          type="button"
          aria-label="Minimize"
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Minus size={18} />
        </button>
      </div>
    </header>
  )
}
