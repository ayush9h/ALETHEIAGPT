"use client";

import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  GearIcon,
  ExitIcon,
  CaretDownIcon,
  CubeIcon,
  GlobeIcon,
  RocketIcon
} from "@radix-ui/react-icons";
import { useState } from "react";
import { SettingsDialog } from "./settings-dialog";
import { UserPrefProps } from "../types/userPref";
import { useMemo } from "react";
type NavbarProps = {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  userPref: UserPrefProps;
  setUserPref:(userPref:UserPrefProps) => void;
};

const MODEL_GROUPS = [
  {
    provider: "OpenAI",
    icon: RocketIcon,
    models: [
      {
        label: "GPT-OSS-120B",
        value: "openai/gpt-oss-120b",
      },
    ],
  },
  {
    provider: "DeepSeek",
    icon: CubeIcon,
    models: [
      {
        label: "Qwen3-32B",
        value: "qwen/qwen3-32b",
      },
    ],
  },
  {
    provider: "Meta",
    icon: GlobeIcon,
    models: [
      {
        label: "Llama-3.1-8B",
        value: "llama-3.1-8b-instant",
      },
    ],
  },
];


export default function Navbar({
  selectedModel,
  setSelectedModel,
  userPref,
  setUserPref,
}: NavbarProps) {
  const { data: session } = useSession();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const currentModel = useMemo(()=>{
    return MODEL_GROUPS.flatMap((g) => g.models).find((m) => m.value === selectedModel)?.label ?? "Select model";
    },[selectedModel])

  if (!session?.user) return null;

  return (
    <nav>
      <div className="flex items-center justify-between px-6 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="font-paragraph flex items-center rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50">
              {currentModel} <CaretDownIcon className="ml-2" />
            </button>
          </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="font-paragraph w-56">
          {MODEL_GROUPS.map((group) => (
            <div key={group.provider}>
              <DropdownMenuLabel className="flex items-center gap-2 text-xs text-stone-500">
                <group.icon className="h-3 w-3" />
                {group.provider}
              </DropdownMenuLabel>
          
              {group.models.map((model) => (
                <DropdownMenuItem
                  key={model.value}
                  onSelect={() => setSelectedModel(model.value)}
                  className="pl-8"
                >
                  {model.label}
                </DropdownMenuItem>
              ))}
            </div>

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
           

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setSettingsOpen(true);
              }}
            >
              Settings
              <DropdownMenuShortcut>
                <GearIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut({ redirectTo: "/" })}>
              Log out
              <DropdownMenuShortcut>
                <ExitIcon className="h-4 w-4 shrink-0" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

       <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} userPref={userPref} setUserPref={setUserPref}/>
      </div>
    </nav>
  );
}
