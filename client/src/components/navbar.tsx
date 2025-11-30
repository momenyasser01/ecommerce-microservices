import { SearchIcon, UserRound } from 'lucide-react'
import Cart from './cart'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full h-18 flex flex-col justify-center items-center border-b">
      <div className="xl:w-[69.4%] w-full h-full flex flex-row justify-between items-center text-white bg-white">
        <Link href={'/'} className="md:flex hidden text-[27px] font-bold text-black xl:ml-0 ml-4.5">
          Fresh<span className="text-green-600/95">Mart</span>
        </Link>

        <div className="flex flex-row justify-center items-center text-gray-500">
          <SearchIcon className="relative left-9 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-12 h-10 rounded-3xl border-2 focus:outline-green-600/95 bg-white w-52 md:w-58 lg:w-82"
          />
        </div>
        <div className="flex flex-row items-center gap-6 mr-5 xl:mr-0">
          <UserRound className="text-black size-7" />
          <Cart />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
