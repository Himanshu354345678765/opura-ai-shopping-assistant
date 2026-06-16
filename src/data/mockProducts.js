export const shoeProduct = {
  id: 1,
  name: 'Air Spain',
  subtitle: 'Unisex Sneakers',
  brand: 'Nike',
  category: 'Sneakers',
  rating: 4.0,
  reviews: '1.1k',
  originalPrice: 5000,
  discountedPrice: 4500,
  discount: '15% OFF',
  material: 'Mesh & Rubber',
  weight: '280g',
  soleType: 'Air Cushion',
  waterResistant: false,
  warranty: '6 months',
  image:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
  sizes: ['7 UK', '8 UK', '9 UK', '10 UK'],
  selectedSize: '8 UK',
  colors: [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Yellow', hex: '#f5c518' },
    { name: 'Red', hex: '#e53935' },
  ],
}

export const allProducts = [
  shoeProduct,
  {
    id: 2,
    name: 'Classic Runner',
    subtitle: 'Performance Running Shoes',
    brand: 'Adidas',
    category: 'Running Shoes',
    rating: 4.5,
    reviews: '2.3k',
    originalPrice: 6200,
    discountedPrice: 5200,
    discount: '16% OFF',
    material: 'Leather & Rubber',
    weight: '310g',
    soleType: 'Boost',
    waterResistant: true,
    warranty: '1 year',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&q=80',
    sizes: ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK'],
    selectedSize: '9 UK',
    colors: [
      { name: 'White', hex: '#f5f5f5' },
      { name: 'Blue', hex: '#2563eb' },
      { name: 'Gray', hex: '#6b7280' },
    ],
  },
  {
    id: 3,
    name: 'Urban Street',
    subtitle: 'Everyday Streetwear',
    brand: 'Puma',
    category: 'Casual',
    rating: 4.2,
    reviews: '890',
    originalPrice: 4200,
    discountedPrice: 3800,
    discount: '10% OFF',
    material: 'Synthetic',
    weight: '295g',
    soleType: 'SoftFoam',
    waterResistant: false,
    warranty: '6 months',
    image:
      'https://images.unsplash.com/photo-1551107699-9bf262895814?w=400&h=400&fit=crop&q=80',
    sizes: ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'],
    selectedSize: '8 UK',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Green', hex: '#22c55e' },
      { name: 'Orange', hex: '#f97316' },
    ],
  },
  {
    id: 4,
    name: 'Pro Sport Elite',
    subtitle: 'Competition Sports Shoes',
    brand: 'Nike',
    category: 'Sports',
    rating: 4.7,
    reviews: '560',
    originalPrice: 7800,
    discountedPrice: 6500,
    discount: '17% OFF',
    material: 'Mesh & Rubber',
    weight: '270g',
    soleType: 'Air Cushion',
    waterResistant: true,
    warranty: '1 year',
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&q=80',
    sizes: ['7 UK', '8 UK', '9 UK', '10 UK', '11 UK'],
    selectedSize: '10 UK',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Red', hex: '#e53935' },
      { name: 'White', hex: '#ffffff' },
    ],
  },
  {
    id: 5,
    name: 'Cloud Walk',
    subtitle: 'Comfort Walking Shoes',
    brand: 'Puma',
    category: 'Casual',
    rating: 4.3,
    reviews: '1.5k',
    originalPrice: 3500,
    discountedPrice: 2900,
    discount: '17% OFF',
    material: 'Synthetic',
    weight: '260g',
    soleType: 'SoftFoam',
    waterResistant: false,
    warranty: '6 months',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&q=80',
    sizes: ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'],
    selectedSize: '7 UK',
    colors: [
      { name: 'Beige', hex: '#d4b896' },
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Gray', hex: '#9ca3af' },
    ],
  },
]

export const chatProducts = allProducts.slice(0, 3).map((p) => ({
  id: p.id,
  name: p.name,
  description: p.subtitle,
  image: p.image,
}))

export const comparisonRows = [
  { key: 'brand', label: 'Brand' },
  { key: 'category', label: 'Category' },
  { key: 'material', label: 'Material' },
  { key: 'weight', label: 'Weight' },
  { key: 'soleType', label: 'Sole Type' },
  { key: 'waterResistant', label: 'Water Resistant' },
  { key: 'rating', label: 'Rating' },
  { key: 'warranty', label: 'Warranty' },
  { key: 'discountedPrice', label: 'Price' },
]

export const categories = ['All', 'Sneakers', 'Running Shoes', 'Casual', 'Sports']

export function getComparisonValue(product, key) {
  switch (key) {
    case 'waterResistant':
      return product.waterResistant ? 'Yes' : 'No'
    case 'rating':
      return `${product.rating} ★ (${product.reviews})`
    case 'discountedPrice':
      return `$${product.discountedPrice.toLocaleString()}`
    default:
      return product[key] ?? '—'
  }
}
