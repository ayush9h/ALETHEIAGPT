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
