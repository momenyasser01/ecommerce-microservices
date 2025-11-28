import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Category from '@/components/category'
import categories from '@/data/categories'

const Categories = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-[62%] sm:w-[66.5%] md:w-[71%] lg:w-[73%] 2xl:w-[60%]"
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            key={category.category}
            className="flex justify-center items-center basis-1/3 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
          >
            <Category category={category.category} image={category.image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Categories
