import { useEffect, useMemo, useState } from 'react'
import { Bookmark, ChevronDown, Plus, Share2, X } from 'lucide-react'
import {
  allProducts,
  categories,
  comparisonRows,
  getComparisonValue,
} from '../data/mockProducts'
import { useCompare } from '../context/CompareContext'

export default function CompareProducts() {
  const { compareProducts, compareIds, setSlot, addToCompare, removeFromCompare } = useCompare()
  const [category, setCategory] = useState('All')
  const [showTable, setShowTable] = useState(false)

  const filtered = useMemo(() => {
    if (category === 'All') return allProducts
    return allProducts.filter((p) => p.category === category)
  }, [category])

  const filled = compareProducts.filter(Boolean)

  const pickProduct = (slotIndex, productId) => {
    const id = Number(productId) || null
    setSlot(slotIndex, id)
    setShowTable(false)
  }

  const addToEmptySlot = () => {
    const next = filtered.find((p) => !compareIds.includes(p.id))
    if (next) addToCompare(next.id)
    setShowTable(false)
  }

  useEffect(() => {
    if (filled.length >= 2) setShowTable(true)
  }, [filled.length])

  return (
    <div className="min-h-[calc(100vh-41px)] bg-[#fafafa] flex flex-col">
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Compare Products
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Easily compare features, prices, and more.
            </p>
          </div>

          <div className="relative w-full sm:w-[200px] shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'Choose Category' : cat}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {compareProducts.map((product, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              {product ? (
                <div className="relative w-full max-w-[220px] aspect-square border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setSlot(index, null)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-gray-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={addToEmptySlot}
                  className="w-full max-w-[220px] aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary bg-white transition-colors"
                >
                  <Plus size={36} strokeWidth={1.2} />
                  <span className="text-sm font-medium text-gray-500">Add Product</span>
                </button>
              )}

              <div className="relative w-full max-w-[220px]">
                <select
                  value={product?.id ?? ''}
                  onChange={(e) => pickProduct(index, e.target.value)}
                  className={`w-full appearance-none rounded-lg px-3 py-2.5 pr-9 text-sm border outline-none focus:border-primary ${
                    product
                      ? 'bg-primary/5 border-primary text-primary font-medium'
                      : 'bg-[#f0f0f0] border-transparent text-gray-500'
                  }`}
                >
                  <option value="">Select Product</option>
                  {filtered.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={compareIds.includes(p.id) && p.id !== product?.id}
                    >
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={() => filled.length >= 2 && setShowTable(true)}
            disabled={filled.length < 2}
            className="px-12 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-40 shadow-sm"
          >
            Compare
          </button>
        </div>

        {showTable && filled.length >= 2 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4">Detailed Comparison</h2>

            <div className="hidden sm:block bg-white border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="bg-[#f5f5f5]">
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-400 w-[140px] border-r border-gray-200" />
                    {filled.map((p) => (
                      <th key={p.id} className="px-5 py-3 text-center text-sm font-semibold text-gray-800 border-r border-gray-200 last:border-r-0">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={row.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                      <td className="px-5 py-3.5 text-sm text-gray-400 border-r border-gray-200">{row.label}</td>
                      {filled.map((p) => (
                        <td key={p.id} className="px-5 py-3.5 text-sm text-gray-700 text-center border-r border-gray-200 last:border-r-0">
                          {getComparisonValue(p, row.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {filled.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                    </div>
                  </div>
                  {comparisonRows.map((row) => (
                    <div key={row.key} className="flex justify-between py-2 text-sm">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="text-gray-800 font-medium">{getComparisonValue(p, row.key)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="px-6 py-4 border-t border-gray-200 bg-white flex gap-6">
        <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <Share2 size={17} /> Share
        </button>
        <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <Bookmark size={17} /> Bookmark
        </button>
      </footer>
    </div>
  )
}
