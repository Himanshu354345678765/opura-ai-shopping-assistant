import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { allProducts } from '../data/mockProducts'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  // 3 slots like the Figma design
  const [slots, setSlots] = useState([null, null, null])

  const setSlot = useCallback((index, productId) => {
    setSlots((prev) => {
      const next = [...prev]
      // clear duplicate if same product picked in another slot
      if (productId) {
        for (let i = 0; i < next.length; i++) {
          if (i !== index && next[i] === productId) next[i] = null
        }
      }
      next[index] = productId || null
      return next
    })
  }, [])

  const addToCompare = useCallback((productId) => {
    setSlots((prev) => {
      if (prev.includes(productId)) return prev
      const next = [...prev]
      const empty = next.findIndex((s) => s === null)
      if (empty !== -1) {
        next[empty] = productId
      } else {
        next[2] = productId
      }
      return next
    })
  }, [])

  const removeFromCompare = useCallback((productId) => {
    setSlots((prev) => prev.map((id) => (id === productId ? null : id)))
  }, [])

  const compareProducts = useMemo(
    () => slots.map((id) => (id ? allProducts.find((p) => p.id === id) : null)),
    [slots],
  )

  const compareIds = slots.filter(Boolean)

  return (
    <CompareContext.Provider
      value={{ slots, compareIds, compareProducts, setSlot, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare needs CompareProvider')
  return ctx
}
