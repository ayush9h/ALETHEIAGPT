import { api } from "./axiosRoute";
export async function userChats(sessionId: number) {
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

export async function createSession(userId: string) {
  const res = await api.post("/sessions", {
    user_id: userId,
  });

  return res.data;
}
