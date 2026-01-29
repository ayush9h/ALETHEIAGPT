import { ChatState, ChatAction } from "../types/userChat";

export const ChatReducer = (state: ChatState, action: ChatAction) => {
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
    
    case "DELETE_SESSION":
      return {
        ...state,
        sessions: state.sessions.filter(
          (s) => s.session_id !== action.payload
        ),
      };
    

    case "SET_USER_PREF":
      return {
        ...state,
        userPref: {
        userCustomInstruction: action.payload?.userCustomInstruction ?? "",
        userPronouns: action.payload?.userPronouns ?? "",
        userHobbies: action.payload?.userHobbies ?? "",
    },
      };
    default:
      return state;
  }
};
