export async function userChats(sessionId: string) {
  const queryParams = new URLSearchParams({
    session_id: sessionId,
  });

  const response = await fetch(`http://127.0.0.1:8000/v1/chats?${queryParams.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get user session data");
  }

  const data = await response.json()
  return data
}

export async function userSessions(userId: string) {
  const queryParams = new URLSearchParams({
    user_id: userId,
  });

  const response = await fetch(`http://127.0.0.1:8000/v1/sessions?${queryParams.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get user session data");
  }

  const data = await response.json()
  return data
}