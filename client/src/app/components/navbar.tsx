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

type NavbarProps = {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  userPref: string;
  setUserPref:(userPref:string) => void;
};

const MODELS = [
  {
    label: "OpenAI`s GPT-OSS-120B",
    value: "openai/gpt-oss-120b",
    icon: RocketIcon,
  },
  {
    label: "Deepseek`s Qwen3-32B",
    value: "qwen/qwen3-32b",
    icon: CubeIcon,
  },
  {
    label: "Meta`s Llama-3.1-8B",
    value: "llama-3.1-8b-instant",
    icon: GlobeIcon,
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

  if (!session?.user) return null;

  const currentModel =
    MODELS.find((m) => m.value === selectedModel)?.label ?? "Select model";

  return (
    <nav>
      <div className="flex items-center justify-between px-6 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="font-paragraph flex items-center rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50">
              {currentModel} <CaretDownIcon className="ml-2" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="font-paragraph">
            {MODELS.map((model) => (
              <DropdownMenuItem
                key={model.value}
                onSelect={() => setSelectedModel(model.value)}
                className="flex items-center gap-2"
              >
                <model.icon className="h-3 w-3 text-stone-600" />
                <span>{model.label}</span>
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
