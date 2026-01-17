import { UserPrefProps } from "../types/userPref";
export type Message = {
  role: "user" | "assistant";
  text: string;
  reasoning: string;
  duration: number ;
  tokens_consumed : number;
};

export type Session = {
  session_id: number;
  session_title: string;
};
export type ChatState = {
  input: string;
  selectedModel: string;
  sessions: Session[];
  messages: Message[];
  selectedSessionId: number | null;
  userPref:UserPrefProps,
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

export const ChatReducer = (state: ChatState, action: any) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };

    case "CLEAR_INPUT":
      return {
        ...state,
        input: "",
      };

    case "SET_MODEL":
      return {
        ...state,
        selectedModel: action.payload,
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };

    case "ADD_SESSION":
      if (state.sessions.includes(action.payload)) return state;
      return { ...state, sessions: [...state.sessions, action.payload] };

    case "SET_SESSIONS":
      return {
        ...state,
        sessions: action.payload,
      };

    case "SET_SELECTED_SESSION":
      return {
        ...state,
        selectedSessionId: action.payload,
      };


    case "SET_USER_PREF":
      return {
        ...state,
        userPref: action.payload,
      };
    default:
      return state;
  }
};
