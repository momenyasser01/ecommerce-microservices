'use client'

import { useEffect, useState } from 'react'

import Product from './product'

interface Product {
  name: string
  price: number
  weight: number
  measurement: string
  image: string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/products?page=1&limit=20')
        if (!res.ok) throw new Error('Failed to fetch products')

        const { data } = await res.json()
        console.log(data)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 w-[60%] md:w-[85%] gap-4">
      {products.map((product) => (
        <Product
          key={product.name}
          name={product.name}
          price={product.price}
          weight={product.weight}
          measurement={product.measurement}
          image={product.image}
        />
      ))}
    </div>
  )
}

export default Products
