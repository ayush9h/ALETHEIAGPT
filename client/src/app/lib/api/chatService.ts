
import { api } from "./axiosRoute";

export async function sendChatMessage(
  selectedModel: string,
  question: string
) {
  return api.post("/chat", {
    model: selectedModel,
    query: question,
  });
}