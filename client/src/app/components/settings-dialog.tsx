"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaceIcon } from "@radix-ui/react-icons";
import { DatabaseIcon } from "lucide-react";
import { UserPrefProps } from "../types/userPref";


type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userPref:UserPrefProps;
  setUserPref: (userPref:UserPrefProps)=>void
};

export function SettingsDialog({
  open,
  onOpenChange,
  userPref,
  setUserPref
}: SettingsDialogProps) {


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-paragraph">
        <div className="flex">
          <aside className="w-32">
            <div className="space-y-2 text-xs">
              <button className="flex w-full items-center justify-center gap-1 rounded-md bg-stone-200 p-2">
                <FaceIcon className="h-3 w-3" />
                Personalization
              </button>
              <button className="flex w-full items-center justify-center gap-1 rounded-md p-2 text-stone-600 hover:bg-stone-100">
                <DatabaseIcon className="h-3 w-3" />
                Data controls
              </button>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto px-4">
            <DialogHeader>
              <DialogTitle className="text-lg">
                Personalization
              </DialogTitle>
              <DialogDescription>
                Customize how the assistant responds to you.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-2">
              <div className="space-y-2">
                <label className="text-sm">Custom instructions</label>
                <textarea
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  onChange={(e)=>setUserPref({...userPref, userCustomInstruction:e.target.value})}
                  rows={3}
                  value={userPref.userCustomInstruction}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Nickname</label>
                <input
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  onChange={(e)=>(setUserPref({...userPref, userPronouns: e.target.value}))}
                  value={userPref.userPronouns}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">More about you</label>
                <textarea
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  onChange={(e) =>
                    setUserPref({ ...userPref, userHobbies: e.target.value })
                  }

                  value={userPref.userHobbies}
                  rows={3}  
                />
              </div>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
