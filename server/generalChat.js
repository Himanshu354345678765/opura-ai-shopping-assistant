// grabs a short answer from wikipedia when someone asks "what is X" type stuff
export async function wikiLookup(topic) {
  try {
    const searchUrl =
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(topic)}` +
      '&limit=1&namespace=0&format=json'

    const searchRes = await fetch(searchUrl)
    if (!searchRes.ok) return null

    const [, titles] = await searchRes.json()
    const title = titles?.[0]
    if (!title) return null

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    )
    if (!summaryRes.ok) return null

    const { extract } = await summaryRes.json()
    if (!extract) return null

    // keep it chat-length, not a whole essay
    const trimmed = extract.length > 480 ? extract.slice(0, 480).trim() + '…' : extract
    return trimmed
  } catch (err) {
    console.log('wiki lookup failed:', err.message)
    return null
  }
}

export function extractTopic(message) {
  const text = message.trim().replace(/\?+$/, '')

  const patterns = [
    /^what is (?:a |an |the )?(.+)/i,
    /^what's (?:a |an |the )?(.+)/i,
    /^what are (.+)/i,
    /^who is (.+)/i,
    /^who was (.+)/i,
    /^tell me about (.+)/i,
    /^explain (.+)/i,
    /^define (.+)/i,
    /^how does (.+) work/i,
    /^where is (.+)/i,
    /^when was (.+) (?:born|founded|created)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return match[1].trim()
  }

  return null
}

// quick math like "what is 5 + 3" or just "12 * 4"
export function trySimpleMath(message) {
  const cleaned = message
    .toLowerCase()
    .replace(/what is|what's|calculate|equals|=/gi, '')
    .trim()

  if (!/^[\d\s+\-*/().]+$/.test(cleaned)) return null

  try {
    const result = Function(`"use strict"; return (${cleaned})`)()
    if (typeof result === 'number' && Number.isFinite(result)) {
      return `That comes out to ${result}.`
    }
  } catch {
    // not valid math, whatever
  }
  return null
}

// small talk and random stuff people actually type
const casualReplies = {
  how_are_you: [
    "I'm doing great, thanks for asking! Ready to help with whatever you need — shopping, questions, or just chatting.",
    "All good on my end! What can I help you with today?",
  ],
  bye: [
    "See you later! Come back anytime you need help.",
    "Bye! I'll be here when you need me.",
  ],
  joke: [
    "Why did the sneaker go to therapy? It had too many sole problems. 😄",
    "What kind of shoes do lazy people wear? Loafers!",
  ],
  love: [
    "Love is a deep feeling of care and connection toward someone or something. Pretty universal human experience, really.",
  ],
  default_chat: [
    "Good question! I might not have the perfect answer but I'm happy to try. Ask me anything — facts, shopping, random thoughts.",
    "Hmm, interesting one. I can look things up, do quick math, or help you find shoes. What direction do you want to go?",
  ],
}

export function getCasualReply(message) {
  const msg = message.toLowerCase()

  if (/how are you|how r u|how's it going|how are u/.test(msg)) {
    return pick(casualReplies.how_are_you)
  }
  if (/^(bye|goodbye|see you|later|good night)\b/.test(msg)) {
    return pick(casualReplies.bye)
  }
  if (/joke|funny|make me laugh/.test(msg)) {
    return pick(casualReplies.joke)
  }
  if (/what is love|meaning of love/.test(msg)) {
    return pick(casualReplies.love)
  }

  return null
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function answerGeneralQuestion(message) {
  // math first — fast
  const mathAnswer = trySimpleMath(message)
  if (mathAnswer) return { reply: mathAnswer, source: 'opura' }

  const casual = getCasualReply(message)
  if (casual) return { reply: casual, source: 'opura' }

  const topic = extractTopic(message)
  if (topic) {
    const wikiAnswer = await wikiLookup(topic)
    if (wikiAnswer) {
      return {
        reply: wikiAnswer + "\n\nNeed anything else? I can also help you shop for sneakers and shoes.",
        source: 'wiki',
      }
    }
  }

  // last resort — still try wiki with the whole message if it's short enough
  if (message.length < 60 && !message.includes('?')) {
    const wikiAnswer = await wikiLookup(message)
    if (wikiAnswer) {
      return { reply: wikiAnswer, source: 'wiki' }
    }
  }

  return null
}
