'use client'

import Product from './product'

const data = [
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
  {
    id: '68daded5a56cefb9ce6c1b47',
    name: 'Hero Black Cherry Jam',
    description: 'Healthy Jam',
    price: 118.75,
    quantity: 99,
    weight: 350,
    measurement: 'G',
    category: 'BREAKFAST',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470270/6277b9fcec9bee759efe604f_d4jp7u.png',
    createdAt: '2025-09-29T19:32:37.256Z',
    updatedAt: '2025-09-29T19:32:37.256Z',
  },
  {
    id: '68dadec7a56cefb9ce6c1b46',
    name: 'Vitrac Light Strawberry Jam',
    description: 'Healthy Jam',
    price: 35.94,
    quantity: 99,
    weight: 220,
    measurement: 'G',
    category: 'BREAKFAST',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470254/EGY_6221024220012_uhfyky.jpg',
    createdAt: '2025-09-29T19:32:23.253Z',
    updatedAt: '2025-09-29T19:32:23.253Z',
  },
  {
    id: '68dadebaa56cefb9ce6c1b45',
    name: 'Dina Farms Dates Milk',
    description: 'Milk',
    price: 18,
    quantity: 99,
    weight: 250,
    measurement: 'ML',
    category: 'DAIRY_AND_EGGS',
    image:
      'https://res.cloudinary.com/dp7t1peti/image/upload/v1758470274/EGY_6224000432140_sqt8dn.png',
    createdAt: '2025-09-29T19:32:10.812Z',
    updatedAt: '2025-09-29T19:32:10.812Z',
  },
]

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-4">
      {data.map((product) => (
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
