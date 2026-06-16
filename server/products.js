const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'what', 'who', 'how', 'why', 'when',
  'where', 'do', 'does', 'can', 'could', 'would', 'should', 'me', 'my', 'i',
  'you', 'your', 'it', 'this', 'that', 'for', 'to', 'of', 'in', 'on', 'at',
  'and', 'or', 'but', 'with', 'about', 'please', 'tell', 'show', 'get', 'give',
])

export const products = [
  {
    id: 1,
    name: 'Air Spain',
    subtitle: 'Unisex Sneakers',
    category: 'Sneakers',
    rating: 4.0,
    reviews: '1.1k',
    originalPrice: 5000,
    discountedPrice: 4500,
    discount: '15% OFF',
    description: 'Premium unisex sneakers with breathable mesh upper and cushioned sole.',
    keywords: ['sneakers', 'unisex', 'casual', 'air spain', 'running', 'shoes', 'comfort'],
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Classic Runner',
    subtitle: 'Performance Running Shoes',
    category: 'Running Shoes',
    rating: 4.5,
    reviews: '2.3k',
    originalPrice: 6200,
    discountedPrice: 5200,
    discount: '16% OFF',
    description: 'Lightweight running shoes with responsive cushioning for daily training.',
    keywords: ['running', 'runner', 'performance', 'training', 'marathon', 'jogging'],
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Urban Street',
    subtitle: 'Everyday Streetwear',
    category: 'Casual',
    rating: 4.2,
    reviews: '890',
    originalPrice: 4200,
    discountedPrice: 3800,
    discount: '10% OFF',
    description: 'Stylish streetwear shoes built for all-day urban comfort.',
    keywords: ['street', 'casual', 'urban', 'everyday', 'lifestyle', 'fashion'],
    image:
      'https://images.unsplash.com/photo-1551107699-9bf262895814?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Pro Sport Elite',
    subtitle: 'Competition Sports Shoes',
    category: 'Sports',
    rating: 4.7,
    reviews: '560',
    originalPrice: 7800,
    discountedPrice: 6500,
    discount: '17% OFF',
    description: 'High-performance sports shoes with superior grip and ankle support.',
    keywords: ['sport', 'sports', 'basketball', 'training', 'elite', 'performance'],
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Cloud Walk',
    subtitle: 'Comfort Walking Shoes',
    category: 'Casual',
    rating: 4.3,
    reviews: '1.5k',
    originalPrice: 3500,
    discountedPrice: 2900,
    discount: '17% OFF',
    description: 'Ultra-soft walking shoes perfect for long hours on your feet.',
    keywords: ['walking', 'comfort', 'soft', 'daily', 'casual', 'budget', 'cheap'],
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&q=80',
  },
]

function isShoppingRelated(text) {
  return /shoe|sneaker|sneakers|running|sport|casual|product|price|cart|buy|compare|deal|discount|brand|size|wear|footwear|walk|runner|stock|sale|order|catalog|recommend|find|show me|looking for|need|want/i.test(
    text,
  )
}

export function searchProducts(query, maxPrice) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t))

  if (terms.length === 0) return []

  let results = products.map((product) => {
    let score = 0
    const haystack = [
      product.name,
      product.subtitle,
      product.category,
      product.description,
      ...product.keywords,
    ]
      .join(' ')
      .toLowerCase()

    for (const term of terms) {
      if (haystack.includes(term)) score += 2
    }

    if (query.toLowerCase().includes(product.name.toLowerCase())) score += 5
    if (query.toLowerCase().includes(product.category.toLowerCase())) score += 3

    return { product, score }
  })

  results = results.filter(({ score }) => score > 0)

  if (maxPrice) {
    results = results.filter(({ product }) => product.discountedPrice <= maxPrice)
  }

  results.sort((a, b) => b.score - a.score)

  return results.slice(0, 3).map(({ product }) => product)
}

export function extractMaxPrice(text) {
  const match = text.match(/(?:under|below|less than|budget|max)\s*\$?\s*(\d[\d,]*)/i)
  if (match) return Number(match[1].replace(/,/g, ''))
  const dollarMatch = text.match(/\$\s*(\d[\d,]*)/)
  if (dollarMatch) return Number(dollarMatch[1].replace(/,/g, ''))
  return null
}

export { isShoppingRelated }
