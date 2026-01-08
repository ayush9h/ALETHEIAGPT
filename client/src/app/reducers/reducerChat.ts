export type Message = {
  role: "user" | "assistant";
  text: string;
  reasoning: string;
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
  userPref:string,
};

export const InitialState: ChatState = {
  input: "",
  selectedModel: "openai/gpt-oss-120b",
  sessions: [],
  messages: [
    { role: "assistant", text: "Hi, how can I help you today?", reasoning: "" },
  ],
  userPref: ""
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

    case "SET_USER_PREF":
      return {
        ...state,
        userPref: action.payload,
      };
    default:
      return state;
  }
};
