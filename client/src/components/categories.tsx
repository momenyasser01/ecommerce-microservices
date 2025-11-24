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
      className="w-[66%] md:w-[50%] lg:w-[80%]"
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            key={category.category}
            className="flex justify-center items-center basis-1/3 md:basis-1/4 lg:basis-1/7"
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
