"use client"
import { AuthContext } from '@/app/context/page'
import { Eye, EyeClosed, Link } from 'lucide-react';
import React, { useContext, useState } from 'react'

const page = () => {
    const {loginFormData,loginHandleSubmit,Toaster,handleInputChange} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <main className="h-[100dvh] flex items-center justify-center  bg-center px-4 sm:px-6 lg:px-8">
                <Toaster position="top-center" />
                <div className="w-[320px] min-h-96 px-8 py-2 text-left bg-[#ffffff] border bg-opacity-100 backdrop-blur-lg rounded-xl shadow-2xl">
                    <form onSubmit={loginHandleSubmit}>
                        <div className="flex flex-col h-full select-none">
                            <div className="mb-2 flex justify-center">
                                <div className="flex-shrink-0">
                                    <Link href='/' className="bg-white px-4 py-2 rounded">
                                        <span className="text-pink-500 text-xl font-bold italic">wedding planet</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="mx-auto">

                                <h1 className="text-2xl font-bold  text-center text-primary">  Login</h1>
                                <div className="mb-4 w-[100%] h-[2px]  bg-gradient-to-r from-primary to-transparent rounded-4xl"></div>

                            </div>


                            <div className="w-full flex flex-col gap-2">

                                <input className="border rounded-lg px-3 py-2 mb-5 text-black text-sm w-full outline-none border-gray-300  bg-opacity-100 placeholder:text-gray-600" placeholder="example@mail.com" type="email" name="email" value={loginFormData.email} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            {/* <label className="font-semibold text-xs text-white tracking-wide">Password</label> */}
                            <div className="flex justify-between items-center border rounded-lg px-3 py-2 mb-5 text-black text-sm w-full  border-gray-300  bg-opacity-100 placeholder:text-gray-600">
                                <input type={showPassword ? "text" : "password"} className="bg-transparent text-black text-sm w-full outline-none placeholder:text-gray-400" placeholder="••••••••" name="password" value={loginFormData.password} onChange={handleInputChange} />
                                <button type="button" className="text-black text-sm" onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <Eye className='w-5 h-5' /> : <EyeClosed className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="py-2 my-4 text-sm bg-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                                LOGIN
                            </button>
                        </div>
                    </form>

                </div>
            </main>
        </div>
    )
}

export default page

