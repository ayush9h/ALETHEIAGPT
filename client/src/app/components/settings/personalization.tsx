'use client'
import {  
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { UserPrefProps } from "@/app/types/userPref";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PersonalizedSettingProps {
  userPref: UserPrefProps;
  setUserPref: (pref: UserPrefProps) => void;
  handleSave: () => Promise<void> | void;
  onOpenChange: (open: boolean) => void;
}

export default function PersonalizationSettings({userPref, setUserPref,handleSave, onOpenChange}: PersonalizedSettingProps ){

    const [draft, setDraft] = useState<UserPrefProps>(userPref);

    useEffect(() => {
      setDraft(userPref);
    }, [userPref]);

    const update = (key: keyof UserPrefProps, value: any) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    };

  
    return(
        <div className="space-y-8">
          <DialogHeader>
            <DialogTitle className="text-xl">Personalization</DialogTitle>
            <DialogDescription>
              Customize how Aletheia responds to you.
            </DialogDescription>
          </DialogHeader>


          <div className="space-y-4">
            <div className="flex justify-between items-start">
              {/* Base Style and Tone */}
              <div>
                <h3 className="text-sm">Base Style and Tone</h3>
                <p className="text-xs text-muted-foreground">
                  This controls response personality, not capability.
                </p>
              </div>

              <Select
                value={draft.baseTone}
                onValueChange={(v) => update("baseTone", v)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Efficient">Efficient</SelectItem>
                  <SelectItem value="Balanced">Balanced</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Custom Instructions */}

            <div className="space-y-2">
              <h3 className="text-xs">Custom instructions</h3>
              <textarea
                className="w-full rounded-md border px-3 py-2 text-sm resize-none"
                rows={4}
                placeholder="Additional behavior, style, or tone preferences"
                value={draft.userCustomInstruction}
                onChange={(e) =>
                  update("userCustomInstruction", e.target.value)
                }
              />
            </div>
            

            <div className="space-y-4">
              <h3 className="font-semibold">About you</h3>

              <div className="space-y-2">
                <h3 className="text-xs">Nickname</h3>
                <input
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="What should Aletheia call you?"
                  value={draft.nickname}
                  onChange={(e) => update("nickname", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xs">Occupation</h3>
                <input
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Your profession or role"
                  value={draft.occupation}
                  onChange={(e) => update("occupation", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xs">More About You</h3>
                <textarea
                  className="w-full rounded-md border px-3 py-2 text-sm resize-none"
                  rows={3}
                  placeholder="Interests, values, preferences"
                  value={draft.userHobbies}
                  onChange={(e) => update("userHobbies", e.target.value)}
                />
              </div>
            </div>                
          </div>

          <div className="flex justify-end gap-2 cursor-pointer">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer" 
              onClick={() => {
                setUserPref(draft)
                handleSave()
              }}>
              Save
            </Button>
          </div>
        </div>
    )
}

