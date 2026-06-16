import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavTabs from './components/NavTabs'
import { ChatProvider } from './context/ChatContext'
import { CompareProvider } from './context/CompareContext'
import ChatHome from './pages/ChatHome'
import ChatResults from './pages/ChatResults'
import ProductCards from './pages/ProductCards'
import CompareProducts from './pages/CompareProducts'

export default function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <ChatProvider>
          <NavTabs />
          <Routes>
            <Route path="/" element={<ChatHome />} />
            <Route path="/chat-results" element={<ChatResults />} />
            <Route path="/product-card" element={<ProductCards />} />
            <Route path="/compare" element={<CompareProducts />} />
          </Routes>
        </ChatProvider>
      </CompareProvider>
    </BrowserRouter>
  )
}
