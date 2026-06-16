import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, Heart, Share2, Star, ShoppingCart, GitCompareArrows } from 'lucide-react'
import { useCompare } from '../context/CompareContext'

export default function ProductCard({ product, variant = 'default' }) {
  const navigate = useNavigate()
  const { addToCompare } = useCompare()
  const [wishlisted, setWishlisted] = useState(variant === 'active')
  const [selectedSize, setSelectedSize] = useState(product.selectedSize)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name)
  const [addedCompare, setAddedCompare] = useState(false)
  const isActive = variant === 'active'

  const handleAddToCompare = () => {
    addToCompare(product.id)
    setAddedCompare(true)
    setTimeout(() => navigate('/compare'), 400)
  }

  return (
    <div
      className={`w-full bg-white rounded-xl border overflow-hidden transition-all duration-300 ${
        isActive
          ? 'border-primary/30 shadow-lg ring-2 ring-primary/20'
          : 'border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 group'
      }`}
    >
      {/* Image */}
      <div className="relative p-3 sm:p-4 pb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover rounded-xl bg-bg-gray"
        />
        <button
          type="button"
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Toggle wishlist"
          className="absolute top-5 sm:top-6 right-5 sm:right-6 p-2 bg-white rounded-full shadow-sm hover:scale-105 transition-transform"
        >
          <Heart
            size={18}
            className={wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}
          />
        </button>
        {product.discount && (
          <span className="absolute top-5 sm:top-6 left-5 sm:left-6 text-[10px] sm:text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-md">
            {product.discount}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{product.subtitle}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
          <span className="text-sm font-medium text-gray-800">{product.rating}</span>
          <span className="text-xs sm:text-sm text-gray-400">({product.reviews} reviews)</span>
        </div>

        {/* Active-only action buttons (always visible on mobile, hover on desktop for default) */}
        <div
          className={`space-y-2 transition-all duration-300 ${
            isActive
              ? 'opacity-100 max-h-40'
              : 'opacity-0 max-h-0 overflow-hidden sm:group-hover:opacity-100 sm:group-hover:max-h-40'
          }`}
        >
          <button
            type="button"
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>
          <button
            type="button"
            onClick={handleAddToCompare}
            className={`w-full py-2.5 border-2 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              addedCompare
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-primary text-primary hover:bg-primary/5'
            }`}
          >
            <GitCompareArrows size={16} />
            {addedCompare ? 'Added!' : 'Add to compare list'}
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isActive && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${product.discountedPrice.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
            {product.discount}
          </span>
        </div>

        {/* View details (default only) */}
        {!isActive && (
          <button type="button" className="text-sm text-primary font-medium hover:underline">
            View Details
          </button>
        )}

        {/* Color swatches */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500">Color:</span>
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                selectedColor === color.name ? 'border-primary scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        {/* Size selector */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg border transition-colors ${
                size === selectedSize
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantity — active state only */}
        {isActive && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-sm">
              <span className="px-3 py-1.5 text-gray-800 font-medium">1</span>
            </div>
          </div>
        )}

        {/* Share / Bookmark */}
        <div
          className={`flex items-center gap-4 pt-2 border-t border-gray-100 transition-all ${
            isActive
              ? 'opacity-100'
              : 'opacity-0 sm:group-hover:opacity-100 max-h-0 sm:max-h-20 overflow-hidden sm:overflow-visible'
          }`}
        >
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <Share2 size={15} />
            Share
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <Bookmark size={15} />
            Bookmark
          </button>
        </div>
      </div>
    </div>
  )
}
