'use client'

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  weight: number
  measurement: string
  category: string
  image: string
  quantity: number
  stock: number
}

interface CartContextType {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])


  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, 150) // prevents spamming localStorage

    return () => clearTimeout(id)
  }, [cart])


  const addItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)

 
      if (item.stock <= 0) return prev

 
      if (exists) {
        const newQty = exists.quantity + item.quantity

 
        if (newQty > exists.stock) return prev

        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: newQty } : i
        )
      }

    
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

 
  const removeItem = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }, [])


  const decreaseQuantity = useCallback((id: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    )
  }, [])


  const clearCart = useCallback(() => setCart([]), [])


  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

 
  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      decreaseQuantity,
      clearCart,
      total,
    }),
    [cart, total, addItem, removeItem, decreaseQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
