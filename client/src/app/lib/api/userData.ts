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


export async function saveUserPref(userPref: {
  userId: string;
  userCustomInstruction: string;
  userPronouns: string;
  userHobbies: string;
}) {
  return api.post("/users/preferences", userPref);
}


export async function getUserPref(userId: string) {

  return api.get("/users/preferences", {params:{user_id: userId}});

}