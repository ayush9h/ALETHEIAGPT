
import { api } from "./axiosRoute";
import { UserPrefProps } from "@/app/types/userPref";

export async function sendChatMessage(
  selectedModel: string,
  question: string,
  userPref: UserPrefProps
) {

  return api.post("/chat", {
    model: selectedModel,
    query: question,
    userPref: userPref
  });
}