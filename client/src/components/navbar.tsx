import { SearchIcon, UserRound } from 'lucide-react'
import Cart from './cart'

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex flex-col">
      <div className="w-full h-full flex flex-row justify-between lg:justify-stretch items-center text-white bg-white">
        <p className="md:flex hidden text-2xl font-bold text-black ml-30">
          Fresh<span className="text-[#00B106]">Mart</span>
        </p>
        <div className="flex flex-row justify-center items-center text-gray-500 w-full">
          <SearchIcon className="relative left-9 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-12 h-10 rounded-3xl border-2  bg-white w-52 md:w-58 lg:w-96"
          />
        </div>
        <div className="flex flex-row items-center gap-6 mr-5 md:mr-30">
          <Cart />
          <UserRound className="text-black" />
        </div>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar
