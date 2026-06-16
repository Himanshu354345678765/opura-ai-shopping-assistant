import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Chat Home' },
  { to: '/chat-results', label: 'Chat Results' },
  { to: '/product-card', label: 'Product Card' },
  { to: '/compare', label: 'Compare' },
]

export default function NavTabs() {
  return (
    <nav className="flex flex-wrap gap-1 px-4 sm:px-6 py-2 bg-bg-gray border-b border-gray-200">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
