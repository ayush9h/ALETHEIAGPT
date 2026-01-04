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
import { GearIcon, ExitIcon, PersonIcon, FaceIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { Dialog, DialogHeader, DialogDescription, DialogTitle, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import { DatabaseIcon } from 'lucide-react'


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
  const [settingsOpen, setSettingsOpen] = useState(false)


  if (!session?.user) return null

  const currentModel =
    MODELS.find((m) => m.value === selectedModel)?.label ?? 'Select model'

  return (
    <nav>
      <div className="flex items-center justify-between px-6 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-paragraph text-stone-700 hover:bg-stone-50">
              {currentModel} <CaretDownIcon className='ml-2' />
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
            <DropdownMenuItem>Profile
              <DropdownMenuShortcut><PersonIcon className='h-4 w-4' /> </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setSettingsOpen(true)
              }}>
              Settings
              <DropdownMenuShortcut>
                <GearIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>


            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut({ redirectTo: '/' })}>
              Log out
              <DropdownMenuShortcut><ExitIcon className='h-4 w-4 shrink-0' /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="font-paragraph">
            <div className="flex">

              <aside className="w-32 p-2 bg-stone-50">
                <div className="space-y-2 text-xs">
                  <button className="flex justify-center items-center w-full rounded-md bg-stone-200 p-2 gap-1">
                    <FaceIcon className='h-3 w-3'/>
                    Personalization
                  </button>
                  <button className="flex justify-center items-center w-full rounded-md p-2 text-stone-600 hover:bg-stone-100 gap-1">
                    <DatabaseIcon className='h-3 w-3'/>
                    Data controls
                  </button>
                </div>
              </aside>

              <main className="flex-1 overflow-y-auto px-6 py-6">
                <DialogHeader>
                  <DialogTitle className="text-lg">Personalization</DialogTitle>
                  <DialogDescription>
                    Customize how the assistant responds to you.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  {/* Custom instructions */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom instructions</label>
                    <textarea
                      placeholder="Additional behavior, style, and tone preferences"
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
                      rows={3}
                    />
                  </div>

                  {/* Nickname */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nickname</label>
                    <input
                      placeholder="What should the assistant call you?"
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
                    />
                  </div>

                  {/* More about you */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">More about you</label>
                    <textarea
                      placeholder="Interests, values, or preferences to keep in mind"
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </main>

            </div>
          </DialogContent>
        </Dialog>


      </div>
    </nav>
  )
}
