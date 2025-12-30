'use client'

import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'

type NavbarProps = {
  selectedModel: string
  setSelectedModel: (model: string) => void
}

const MODELS = [
  { label: 'Meta`s Llama3-8B', value: 'llama3-8b-8192' },
  { label: 'Deepseek`s Qwen3-32B', value: 'qwen/qwen3-32b' },
  { label: 'Google`s Gemma2-9B', value: 'gemma2-9b-it' },
]

export default function Navbar({ selectedModel, setSelectedModel }: NavbarProps) {
  const { data: session } = useSession()

  if (!session?.user) return null

  const currentModel =
    MODELS.find((m) => m.value === selectedModel)?.label ?? 'Select model'

  return (
    <nav>
       <div className="flex items-center justify-between px-6 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-paragraph text-stone-700 hover:bg-stone-50">
              {currentModel} <CaretDownIcon className='ml-2'/>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="font-paragraph">
            {MODELS.map((model) => (
              <DropdownMenuItem
                key={model.value}
                onSelect={() => setSelectedModel(model.value)}
              >
                {model.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={session.user.image as string}
              alt="User avatar"
              className="h-10 w-10 cursor-pointer rounded-full bg-stone-200 p-1 hover:bg-stone-300"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="font-paragraph">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut({ redirectTo: '/' })}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </nav>
  )
}
