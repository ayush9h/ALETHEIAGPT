import { api } from "./axiosRoute";
export async function userChats(sessionId: string) {
  return api.get("/chats", {
    params: {
      session_id: sessionId,
    },
  });
}

export async function userSessions(userId: string) {
  return api.get("/sessions", {
    params: {
      user_id: userId,
    },
  });
}