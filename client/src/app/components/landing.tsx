"use client";
import { signIn } from "next-auth/react";
import { StarIcon } from "@radix-ui/react-icons";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-stone-300 p-2">
          <StarIcon className="h-3 w-3" />
          <span className="font-paragraph text-xs">Currently in Beta</span>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="font-header text-5xl font-semibold text-blue-500 md:text-8xl">
            ALETHEIAGPT 
          </h1>
        </div>

        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
          {/* <button
            onClick={() => signIn("google", { redirectTo: "/chat" })}
            className="font-paragraph flex cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-stone-50 p-3 text-sm text-stone-800 transition-all duration-300 hover:bg-stone-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="h-4 w-4"
              loading="lazy"
            />
            <span>Sign in with Google</span>
          </button> */}

          {/* GitHub Button */}
          <button
            onClick={() => signIn("github", { redirectTo: "/chat" })}
            className="font-paragraph flex cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-stone-50 p-3 text-sm text-stone-800 transition-all duration-300 hover:bg-stone-200"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub logo"
              className="h-4 w-4"
              loading="lazy"
            />
            <span>Sign in with GitHub</span>
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-16 w-full max-w-3xl text-center">
        <div className="font-paragraph text-xs text-stone-500">
          © {new Date().getFullYear()} ALETHEIAGPT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
