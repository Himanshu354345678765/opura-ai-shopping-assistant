import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProductImage({ src, alt, name }) {
  const [failed, setFailed] = useState(false)
  const fallback = `https://placehold.co/112x112/e8eef7/4F6EF7?text=${encodeURIComponent(name.split(' ')[0])}`

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-primary transition-colors bg-bg-gray shrink-0">
      {!failed ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover block"
        />
      ) : (
        <img src={fallback} alt="" className="w-full h-full object-cover block" />
      )}
    </div>
  )
}

export default function ProductGrid({ products }) {
  if (!products?.length) return null

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10 mb-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to="/product-card"
            className="flex flex-col items-center gap-2 group w-[7rem] sm:w-[7.5rem]"
          >
            <ProductImage src={product.image} alt={product.name} name={product.name} />
            <span className="text-xs font-medium text-gray-700 text-center w-full truncate group-hover:text-primary">
              {product.name}
            </span>
            <span className="text-xs text-gray-400">
              ${product.discountedPrice?.toLocaleString()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
