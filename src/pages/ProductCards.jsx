import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/mockProducts'

export default function ProductCards() {
  const [activeProductId, setActiveProductId] = useState(allProducts[0].id)
  const activeProduct = allProducts.find((p) => p.id === activeProductId) ?? allProducts[0]

  return (
    <div className="min-h-[calc(100vh-41px)] bg-bg-gray py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5">
            Product Card Component
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Default state vs Hover / Active state
          </p>
        </div>

        {/* Product picker — more options */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-hide">
          {allProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveProductId(p.id)}
              className={`flex items-center gap-2 shrink-0 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors ${
                activeProductId === p.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <img src={p.image} alt="" className="w-6 h-6 rounded-full object-cover" />
              {p.name}
            </button>
          ))}
        </div>

        {/* Two card variants — responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
              Default State
            </span>
            <p className="text-xs text-gray-400 text-center hidden sm:block">
              Hover on desktop to reveal actions
            </p>
            <div className="w-full max-w-sm">
              <ProductCard product={activeProduct} variant="default" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
              Hover / Active State
            </span>
            <p className="text-xs text-gray-400 text-center hidden sm:block">
              Full options: cart, compare, qty, colors
            </p>
            <div className="w-full max-w-sm">
              <ProductCard product={activeProduct} variant="active" />
            </div>
          </div>
        </div>

        {/* All products grid — extra responsive showcase */}
        <div className="mt-10 sm:mt-14">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} variant="default" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
