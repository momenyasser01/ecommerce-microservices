'use client'

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-1/2 flex flex-col justify-center bg-neutral-5 gap-8">
        <p className="text-3xl font-semibold tracking-tight w-fit pl-6">
          Welcome to <span className="text-[#00D100]">Fresh Mart,</span> we deliver groceries to
          your door step{' '}
        </p>
        <p className="text-xl tracking-tight w-fit pl-6">
          Save time, skip the lines, and enjoy the convenience of quick, efficient delivery
        </p>
      </div>

      <div className="w-1/2 bg-[#00D100] h-screen flex justify-center items-center">
        <div className="bg-white rounded-4xl min-w-[50%] min-h-[500px] flex flex-col justify-center items-center shadow-xl gap-20">
          <p className="font-semibold text-3xl">Login</p>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <input type="text" placeholder="Email" className="w-[75%] h-12 rounded-4xl border-2 pl-6" />
            <input
              type="password"
              placeholder="Password"
              className="w-[75%] h-12 rounded-4xl border-2 pl-6"
            />
          </div>
          <Button onClick={() => {}} className="bg-[#00D100] w-[75%] h-11 rounded-4xl hover:bg-[#00A300]">
            LOGIN
          </Button>
        </div>
      </div>
    </div>
  )
}
