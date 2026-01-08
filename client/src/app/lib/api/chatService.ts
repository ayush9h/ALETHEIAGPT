
import { api } from "./axiosRoute";
import { UserPrefProps } from "@/app/types/userPref";

export async function sendChatMessage(
  selectedModel: string,
  question: string,
  userPref: UserPrefProps
) {
  console.log(userPref)
  return api.post("/chat", {
    model: selectedModel,
    query: question,
    userPref: userPref
  });
}