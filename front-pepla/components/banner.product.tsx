"use client"

import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <div className="mt-16 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-black dark:bg-white"/>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Lo mejor del gaming
                    </span>
                    <div className="h-[2px] w-12 bg-black dark:bg-white"/>
                </div>
                
                <h4 className="text-5xl lg:text-7xl font-black mb-4 tracking-tight">
                    Puros GOTYS 🏆
                </h4>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Los juegos mas premiados y mas pros jaja eso que xd
                </p>
                
                <Link 
                    href="#" 
                    className={buttonVariants({ size: "lg", className: "px-8" })}
                    onClick={(e) => {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    Comprar
                </Link>
            </div>

            <div className="h-[250px] bg-contain lg:h-[600px] bg-[url('/banner.png')] bg-center bg-no-repeat" />
        </div>
    )
}

export default BannerProduct;