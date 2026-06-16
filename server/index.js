import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { generateReply } from './assistant.js'
import { products } from './products.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    ai: process.env.GEMINI_API_KEY ? 'gemini' : 'opura-local',
    products: products.length,
  })
})

app.get('/api/products', (_req, res) => {
  res.json(products)
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const result = await generateReply(message.trim(), history)

    res.json({
      reply: result.reply,
      products: result.products,
      source: result.source,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({
      error: 'Failed to generate response',
      reply: "Sorry, I'm having trouble right now. Please try again in a moment.",
      products: [],
    })
  }
})

app.listen(PORT, () => {
  console.log(`Opura AI backend running on http://localhost:${PORT}`)
  console.log(`AI mode: ${process.env.GEMINI_API_KEY ? 'Gemini API' : 'Built-in Opura assistant'}`)
})
