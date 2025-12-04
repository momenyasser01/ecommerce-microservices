'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Product from './product'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useMemo, useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  weight: number
  stock: number
  category: string
  measurement: string
  image: string
}

async function fetchProducts(page: number, category: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/products?category=${category}&page=${page}&limit=16`,
      {
        cache: 'force-cache',
        next: { revalidate: 60 },
      },
    )

    // if (res.status === 404)
    //   return (
    //     <div className="w-full h-full flex flex-grow justify-center items-start text-center">
    //       <p className="font-semibold">No products were found</p>
    //     </div>
    //   )

    return res.json()
  } catch (error) {
    console.error(error)
  }
}

const generatePages = (page: number, totalPages: number) => {
  const delta = 2
  const pages: (number | '...')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i)
    } else if ((i === page - delta - 1 && i > 1) || (i === page + delta + 1 && i < totalPages)) {
      pages.push('...')
    }
  }

  return [...new Set(pages)]
}

const Products = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get('page')) || 1
  const category = searchParams.get('category') || ''

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, category],
    queryFn: () => fetchProducts(page, category),
    staleTime: 120 * 1000,
  })

  const changePage = (newPage: number) => {
    router.push(`?page=${newPage}`)
  }

  const totalPages = data?.totalPages ?? 0
  const products: Product[] = data?.data ?? []

  const pages = useMemo(() => generatePages(page, totalPages), [page, totalPages])

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center py-10">
        <div className="w-12 h-12 border-[#00B106] border-4 border-t-transparent border-b-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-black font-medium">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p className="text-red-600 font-semibold">Error: {(error as Error).message}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-full flex flex-grow justify-center items-start text-center">
        <p className="font-semibold">No products were found</p>
      </div>
    )
  }

  return (
    <div className="2xl:w-[69%] md:w-[80%] w-[94%] flex flex-col gap-20 pb-10">
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-2">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              weight={product.weight}
              stock={product.stock}
              category={product.category}
              measurement={product.measurement}
              image={product.image}
            />
          ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => changePage(Math.max(page - 1, 1))} href="#" />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === '...' ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault()
                    changePage(p as number)
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext onClick={() => changePage(Math.min(page + 1, totalPages))} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Products
