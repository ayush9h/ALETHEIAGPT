"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authProviders } from "../types/auth-provider";

export default function Landing() {
  
  const {data: session} = useSession()
  const router = useRouter()

  useEffect( () => {
    if(session) 
      router.replace('/chat');
    },
    [session]);
  
  return (
    <div className="flex min-h-screen flex-col px-4 py-8">
      <div className="flex flex-1 flex-col items-center justify-center">

        <div className="mb-8">
          <div className="relative gap-2 inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium font-paragraph bg-white/70 backdrop-blur-md border border-stone-200 shadow-[0_6px_20px_rgba(0,0,0,0.06)] text-stone-600 overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />

            <span className="relative z-10">
              Currently in development
            </span>

          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="font-header text-5xl font-extrabold text-blue-500 md:text-8xl">
            aletheia 
          </h1>
        </div>

        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">

          {authProviders.map((item)=>(
            <button key={item.id} onClick={()=>signIn(item.id, {redirectTo:"/chat"})} className="font-paragraph flex cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm text-stone-800 transition-all ease-in-out duration-300 hover:bg-stone-200/50">
                <Image src={item.icon} alt={item.title} width={15} height={15} loading="lazy"/>
                <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <footer className="mx-auto mt-16 w-full max-w-3xl text-center">
        <div className="font-paragraph text-xs text-stone-500">
          © {new Date().getFullYear()} Aletheia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
