import { Session, Message } from "./userMessage";
import { UserPrefProps } from "./userPref";


export type ChatState = {
  input: string;
  selectedModel: string;
  sessions: Session[];
  messages: Message[];
  selectedSessionId: number | null;
  userPref:UserPrefProps,
};


export type ChatAction =
  | { type: "SET_INPUT"; payload: string }
  | { type: "CLEAR_INPUT" }
  | { type: "SET_MODEL"; payload: string }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_SESSION"; payload: Session }
  | { type: "SET_SESSIONS"; payload: Session[] }
  | { type: "SET_SELECTED_SESSION"; payload: number | null }
  | { type: "DELETE_SESSION"; payload: number }
  | {
      type: "SET_USER_PREF";
      payload?: {
        userCustomInstruction?: string;
        userPronouns?: string;
        userHobbies?: string;
      };
    };


export const InitialState: ChatState = {
  input: "",
  selectedModel: "openai/gpt-oss-120b",
  selectedSessionId: null,
  sessions: [],
  messages: [
    { role: "assistant", text: "Hi, how can I help you today?", reasoning: "", duration:0, tokens_consumed:0 },
  ],
  userPref: {
  userCustomInstruction: "",
  userPronouns: "",
  userHobbies: "",
}, 
};