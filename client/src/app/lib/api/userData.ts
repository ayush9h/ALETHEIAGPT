export async function userData(userId: string, sessionId: string) {
  const queryParams = new URLSearchParams({
    user_id: userId,
    session_id: sessionId,
  });

  const response = await fetch(`http://localhost:5000/api/v1/blockgpt/user-session-data?${queryParams.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get user session data");
  }

  const data = await response.json()
  return data.service_output;
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