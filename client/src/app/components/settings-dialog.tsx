"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { UserPrefProps } from "../types/userPref";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSaveUserPreferences } from "../hooks/userUserPref";
import { SETTING_SECTIONS } from "../config/userSettings";
import { useState } from "react";
import PersonalizationSettings from "./settings/personalization";
import DataControls from "./settings/data-controls";
import General from "./settings/general";

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

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [activeSection, setActiveSection]= useState<string>('personalization')


  const {savePreferences} = useSaveUserPreferences()
  const handleSave = async () => {
   await savePreferences(userId as string, userPref)
   onOpenChange(false)
}

  function renderSection(){
    switch(activeSection){
      case 'personalization':
        return (
          <PersonalizationSettings userPref={userPref} setUserPref= {setUserPref} />  
        )
      case 'general':
        return (<General/>)

      case 'data-controls':
        return (<DataControls/>)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-paragraph max-w-2xl h-[85%]">
        <div className="flex gap-4">
          <aside className="w-36">
            <div className="space-y-2 text-xs">

              {SETTING_SECTIONS.map(section=>(
                <button key={section.id}  
                        onClick={() => setActiveSection(section.id)} 
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ease-in-out transition-all w-full ${ activeSection === section.id ? "bg-stone-200" : ""}`}>
                  <section.icon className="h-4 w-4"/>
                  {section.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto">
             {renderSection()}
          </main>
          
        </div>
        <div className="flex justify-end gap-2 cursor-pointer">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
