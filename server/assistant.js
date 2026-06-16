import { answerGeneralQuestion } from './generalChat.js'
import { extractMaxPrice, isShoppingRelated, products, searchProducts } from './products.js'

const catalog = products
  .map((p) => `${p.name}: $${p.discountedPrice} (${p.discount}) — ${p.description}`)
  .join('\n')

const SYSTEM_PROMPT = `You are Opura AI — a friendly, smart assistant who can talk about anything AND help people shop for sneakers.

Rules:
- Answer any question naturally (facts, advice, casual chat, math, etc.)
- Keep replies concise, warm, like texting a helpful friend
- When shopping comes up, use ONLY these real products:
${catalog}
- Don't make up products or prices
- 2-4 sentences usually, unless they want detail`

function getIntent(msg) {
  const lower = msg.toLowerCase().trim()

  if (/^(hi|hello|hey|hii|yo|sup|good morning|good evening)\b/.test(lower)) return 'greeting'
  if (/who are you|what are you|about yourself/.test(lower)) return 'about'
  if (/compare| vs |versus|difference between/.test(lower)) return 'compare'
  // search before price — "find shoes under $5000" should search, not just quote price
  if (isShoppingRelated(lower)) return 'search'
  if (/price|cost|how much|cheap|budget|deal|discount/.test(lower)) return 'price'
  if (/help|what can you do/.test(lower)) return 'help'
  if (/cart|buy|purchase|order/.test(lower)) return 'purchase'
  if (/thank|thanks|ty\b/.test(lower)) return 'thanks'

  return 'general'
}

function shoppingReply(intent, message, matched) {
  const maxPrice = extractMaxPrice(message)
  const top = matched[0]

  if (intent === 'greeting') {
    return "Hey! 👋 I'm Opura — ask me anything, or I can help you find the perfect pair of shoes. What's on your mind?"
  }

  if (intent === 'about') {
    return "I'm Opura AI. I answer questions, chat, do quick math, and I'm really good at finding sneakers. Try me with anything — 'what is Python' or 'running shoes under $5000'."
  }

  if (intent === 'help') {
    return "Literally ask me anything — general knowledge, advice, jokes, math. For shopping try: 'find casual sneakers' or 'compare Air Spain vs Classic Runner'."
  }

  if (intent === 'thanks') {
    return "Anytime! Happy to help."
  }

  if (intent === 'compare' && matched.length) {
    const names = matched.map((p) => p.name).join(', ')
    return `Compare ${names} in the Compare tab for full specs.${top ? ` I'd lean toward ${top.name} at $${top.discountedPrice.toLocaleString()}.` : ''}`
  }

  if (intent === 'price') {
    if (top) {
      return `${top.name} is $${top.discountedPrice.toLocaleString()} right now (was $${top.originalPrice.toLocaleString()}, ${top.discount}).`
    }
    return 'Prices run from $2,900 to $6,500. Tell me your budget and I\'ll narrow it down.'
  }

  if (intent === 'purchase') {
    if (top) return `Add ${top.name} from the product page — $${top.discountedPrice.toLocaleString()}, sizes 6–10 UK available.`
    return 'Pick a product below and hit Add to cart, or ask me to recommend something.'
  }

  if (intent === 'search') {
    if (!matched.length) {
      return "Couldn't find a match. Try 'running shoes', 'casual sneakers under $4000', or browse by brand."
    }
    if (maxPrice) {
      return `Found ${matched.length} under $${maxPrice.toLocaleString()}. Top pick: ${top.name} — ${top.description} At $${top.discountedPrice.toLocaleString()} (${top.discount}).`
    }
    return `${top.name} looks like the best fit — ${top.description} $${top.discountedPrice.toLocaleString()} with ${top.discount}. Want to compare options?`
  }

  return null
}

async function askGemini(message, history) {
  const key = process.env.GEMINI_API_KEY
  if (!key) return null

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            { role: 'model', parts: [{ text: 'Got it — I\'m Opura, ready to help with anything.' }] },
            ...history.map((m) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
            { role: 'user', parts: [{ text: message }] },
          ],
        }),
      },
    )

    if (!res.ok) return null
    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null
  } catch (e) {
    console.log('gemini error:', e.message)
    return null
  }
}

export async function generateReply(message, history = []) {
  const intent = getIntent(message)
  const isShopping = ['search', 'compare', 'price', 'purchase'].includes(intent)
  const matched = isShoppingRelated(message) ? searchProducts(message, extractMaxPrice(message)) : []

  let reply = null
  let source = 'opura'

  // gemini handles everything if available
  if (process.env.GEMINI_API_KEY) {
    reply = await askGemini(message, history)
    if (reply) source = 'gemini'
  }

  // shopping-specific fallback
  if (!reply && (isShopping || intent === 'greeting' || intent === 'about' || intent === 'help' || intent === 'thanks')) {
    reply = shoppingReply(intent, message, matched)
  }

  // general questions — wiki, math, small talk
  if (!reply) {
    const general = await answerGeneralQuestion(message)
    if (general) {
      reply = general.reply
      source = general.source
    }
  }

  // nothing worked — friendly default
  if (!reply) {
    reply =
      "I'm not 100% sure on that one, but I'm always happy to try! Ask me about facts ('what is JavaScript'), math ('15 * 8'), or shoes ('find sneakers under $4000')."
  }

  reply = reply.replace(/\*\*(.*?)\*\*/g, '$1')

  const showProducts = isShopping && matched.length > 0

  return {
    reply,
    products: showProducts ? matched : [],
    source,
  }
}
