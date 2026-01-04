export async function sendChatMessage(selectedModel: string, question: string) {
  const response = await fetch("http://127.0.0.1:8000/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: selectedModel,
      query: question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from the API");
  }
  console.log(response);

  return response.json();
}
