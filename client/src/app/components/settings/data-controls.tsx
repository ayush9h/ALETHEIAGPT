import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
export default function DataControls({userId}:{userId:string}){
    
    // Deletes all the chats on the basis of userId


    return (
        
        <>
            <DialogHeader>
                <DialogTitle className="text-xl">Data Controls</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center ">
                  {/* Base Style and Tone */}
                  <div>
                    <h3 className="text-sm">Delete all chats</h3>
                  </div>
                  <button className="bg-red-200 border border-red-600 text-red-600 text-xs px-4 py-1.5 rounded-md hover:bg-red-300 ease-in-out">Delete all</button>
                </div>
            </div>             

        </>
        
    )
}