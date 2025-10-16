'use client'

import Category from '@/components/category'
import Navbar from '@/components/navbar'
import Products from '@/components/products'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-20 overflow-y-auto bg-[#F5F5F5]">
      <div className="w-full fixed top-0 left-0 z-10">
        <Navbar />
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-[66%] md:w-[50%] lg:w-[80%] mt-26"
      >
        <CarouselContent>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Fruits and Vegetables" image="/fruits-and-vegetables.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Poultry and Meat" image="/meat.png" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Dairy and Eggs" image="/dairy-and-eggs.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Seafood" image="/fish4.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Poultry and Meat" image="/meat.png" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Seafood" image="/fish4.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Dairy and Eggs" image="/dairy-and-eggs.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Fruits and Vegetables" image="/fruits-and-vegetables.jpg" />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7">
            <Category category="Dairy and Eggs" image="/dairy-and-eggs.jpg" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <div className="w-[80%] md:h-[620px] lg:h-96 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center justify-center items-center gap-8">
        
        
        

        {/* <Category category="Breakfast" /> */}

      {/* <Category category="Beverages" />
        <Category category="Snacks and Chocolate" />
        <Category category="Ice Cream" /> */}

      {/* <Category category="Bakery" /> */}

      {/* <Category category="Breakfast" /> */}

      {/* <Category category="Beverages" />
        <Category category="Snacks and Chocolate" />
        <Category category="Ice Cream" /> */}

      {/* <Category category="Bakery" /> }
        

        
      </div> */}
      <div className="w-full flex justify-center items-center">
        <Products />
      </div>
    </div>
  )
}
