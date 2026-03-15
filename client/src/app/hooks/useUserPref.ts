import { useEffect, useCallback, Dispatch } from "react";
import { saveUserPref } from "../lib/api/userData";
import { getUserPref } from "../lib/api/userData";
import { ChatAction } from "../types/userChat";
import { UserPrefProps } from "../types/userPref";

export function useUserPreferences(
  userId: string | undefined,
  dispatch: Dispatch<ChatAction>
) {
  useEffect(() => {
    if (!userId) return;

    getUserPref(userId)
    .then((res) => {
      dispatch({ type: "SET_USER_PREF", payload: res.data });
      })
      .catch(() => {
        dispatch({
          type: "SET_USER_PREF",
          payload: {
            userCustomInstruction: "",
            nickname:"",
            occupation: "",
            baseTone: "",
            userHobbies: "",
          },
        });
      });
  }, [userId, dispatch]);
}

export function useSaveUserPreferences(){
    const savePreferences =  useCallback(async (userId: string, userPref: UserPrefProps) => {
    if (!userId) return;

    await saveUserPref({
      userId,
      ...userPref,
    });

  },[]);

  return {savePreferences}
}