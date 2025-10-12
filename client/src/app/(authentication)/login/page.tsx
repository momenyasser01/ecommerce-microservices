'use client'

import { Button } from '@/components/ui/button'

function Login() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-1/4 flex flex-col justify-center bg-neutral-5 gap-8">
        <div className="rounded-4xl min-w-[50%] min-h-[500px] flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="font-semibold text-4xl">Welcome back</p>
            <p className="text-gray-500 text-sm">Enter email and password to access your account</p>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <input
              type="text"
              placeholder="Email"
              className="w-[75%] h-12 rounded-4xl border-2 pl-6"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[75%] h-12 rounded-4xl border-2 pl-6"
            />
          </div>
          <Button
            onClick={() => {}}
            className="bg-[#01B763] w-[75%] h-11 rounded-4xl hover:bg-[#01B763]"
          >
            LOGIN
          </Button>
        </div>
      </div>

      <div className="w-3/4 bg-[#01B763] h-screen flex flex-col justify-center items-center gap-6">
        <p className="text-4xl tracking-tight text-white w-fit pl-6">
          Welcome to <span className="font-semibold">Fresh Mart</span>, we deliver groceries to your
          door step{' '}
        </p>
        <p className="text-2xl tracking-tight text-white w-fit pl-6">
          Save time, skip the lines, and enjoy the convenience of quick, efficient delivery
        </p>
      </div>
    </div>
  )
}

export default Login
