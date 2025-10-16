'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './product'

interface Product {
  name: string
  price: number
  weight: number
  measurement: string
  image: string
}

const data = [
  {
    id: '68efeb17061fe9374a07dbcf',
    name: 'Juhayna Pure Orange Juice 235ml',
    description: 'Pure Orange Juice',
    price: 17.95,
    quantity: 99,
    weight: 235,
    measurement: 'ML',
    category: 'BEVERAGES',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1760553712/EGY_6222014330667_ocw3md.png',
    createdAt: '2025-10-15T18:42:25.774Z',
    updatedAt: '2025-10-15T18:42:25.774Z',
  },
  {
    id: '68efe97c061fe9374a07dbcd',
    name: 'Fresh Source Kiwi 500g',
    description: 'Kiwi',
    price: 190,
    quantity: 99,
    weight: 500,
    measurement: 'G',
    category: 'FRUITS_AND_VEGETABLES',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758666738/EGY_6224010502222_ibjq98.jpg',
    createdAt: '2025-10-15T18:35:40.971Z',
    updatedAt: '2025-10-15T18:35:40.971Z',
  },
  {
    id: '68efe805061fe9374a07dbcc',
    name: 'Shahd Chicken Fillet 400g',
    description: 'Chicken',
    price: 129.95,
    quantity: 99,
    weight: 400,
    measurement: 'G',
    category: 'MEAT_POULTRY_AND_SEAFOOD',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758666219/EGY_6223002610679_hepf9y.png',
    createdAt: '2025-10-15T18:29:25.778Z',
    updatedAt: '2025-10-15T18:29:25.778Z',
  },
  {
    id: '68efe759061fe9374a07dbcb',
    name: 'Juhayna Zabado Mango 220g',
    description: 'Drinking Yoghurt',
    price: 18,
    quantity: 99,
    weight: 220,
    measurement: 'G',
    category: 'DAIRY_AND_EGGS',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470276/625ea1ab9678effe268c4335_ii7jlj.png',
    createdAt: '2025-10-15T18:26:33.546Z',
    updatedAt: '2025-10-15T18:26:33.546Z',
  },
  {
    id: '68efe6c4061fe9374a07dbca',
    name: 'Reefy Pasteurized Natural Rayeb Full Cream 850 ML',
    description: 'Rayeb',
    price: 52,
    quantity: 99,
    weight: 850,
    measurement: 'ML',
    category: 'DAIRY_AND_EGGS',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470250/EGY_6224011536196_pqt69y.png',
    createdAt: '2025-10-15T18:24:04.523Z',
    updatedAt: '2025-10-15T18:24:04.523Z',
  },
  {
    id: '68efe638061fe9374a07dbc9',
    name: "Temmy's Choco Rice 250g",
    description: 'Cereal',
    price: 74.95,
    quantity: 99,
    weight: 250,
    measurement: 'G',
    category: 'BREAKFAST',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470258/EGY_6221012000824_mk0n3d.jpg',
    createdAt: '2025-10-15T18:21:44.879Z',
    updatedAt: '2025-10-15T18:21:44.879Z',
  },
  {
    id: '68efe622061fe9374a07dbc8',
    name: "Temmy's Choco Rice 375g",
    description: 'Cereal',
    price: 94.25,
    quantity: 99,
    weight: 375,
    measurement: 'G',
    category: 'BREAKFAST',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470258/EGY_6221012000824_mk0n3d.jpg',
    createdAt: '2025-10-15T18:21:22.271Z',
    updatedAt: '2025-10-15T18:21:22.271Z',
  },
  {
    id: '68dadef3a56cefb9ce6c1b4a',
    name: 'Lamar Red Grape Juice 100%',
    description: 'Natural juice',
    price: 64,
    quantity: 102,
    weight: 1000,
    measurement: 'ML',
    category: 'BEVERAGES',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758405139/EGY_6224001105487_egmwdv.png',
    createdAt: '2025-09-29T19:33:07.057Z',
    updatedAt: '2025-09-29T21:37:14.181Z',
  },
  {
    id: '68dadeeaa56cefb9ce6c1b49',
    name: 'Red Bull Energy Drink',
    description: 'Energy Drink',
    price: 50,
    quantity: 99,
    weight: 250,
    measurement: 'ML',
    category: 'BEVERAGES',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470254/61819ff1164d2157176af136_gul9iq.jpg',
    createdAt: '2025-09-29T19:32:58.020Z',
    updatedAt: '2025-09-29T19:32:58.020Z',
  },
  {
    id: '68dadedfa56cefb9ce6c1b48',
    name: 'Red Bull White Edition',
    description: 'Energy Drink',
    price: 50,
    quantity: 99,
    weight: 250,
    measurement: 'ML',
    category: 'BEVERAGES',
    image: 'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470252/EGY_90435775_x7gaz3.jpg',
    createdAt: '2025-09-29T19:32:47.282Z',
    updatedAt: '2025-09-29T19:32:47.282Z',
  },
]

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products', {
          params: { page: 1, limit: 20 },
        })
        console.log(res.data.data)
        setProducts(res.data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 w-[60%] md:w-[85%] gap-4">
      {products.length > 0
        ? products.map((product) => (
            <Product
              key={product.name}
              name={product.name}
              price={product.price}
              weight={product.weight}
              measurement={product.measurement}
              image={product.image}
            />
          ))
        : data.map((product) => (
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
