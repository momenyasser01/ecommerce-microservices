import { SearchIcon, ShoppingCartIcon, UserRound } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-16 justify-stretch items-center text-white bg-white">
        <p className="md:flex hidden text-2xl font-bold text-black ml-30">
          Fresh<span className="text-[#12BC07]">Mart</span>
        </p>
        <div className="flex flex-row justify-center items-center text-gray-500 w-full">
          <SearchIcon className="relative left-9 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-12 h-10 rounded-3xl border-2  bg-white w-96"
          />
        </div>
        <div className="flex flex-row items-center gap-6 mr-5 md:mr-30">
          <ShoppingCartIcon className="text-black" />
          <UserRound className="text-black" />
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar
