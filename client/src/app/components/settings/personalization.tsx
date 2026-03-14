import {  
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { UserPrefProps } from "@/app/types/userPref";

export default function PersonalizationSettings({userPref, setUserPref}: {userPref: UserPrefProps, setUserPref:(userPref:UserPrefProps)=>void},){
    return(
        <>
        <DialogHeader>
              <DialogTitle className="text-xl">
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
                  className="w-full rounded-md border px-3 py-2 text-sm resize-none"
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
                  className="w-full rounded-md border px-3 py-2 text-sm resize-none"
                  onChange={(e) =>
                    setUserPref({ ...userPref, userHobbies: e.target.value })
                  }

                  value={userPref.userHobbies}
                  rows={3}  
                />
              </div>
            </div>
        </>
    )
}

