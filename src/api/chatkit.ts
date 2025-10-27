// API para integração com OpenAI ChatKit
export async function getChatKitSessionToken(deviceId: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_SECRET_KEY}`,
      },
      body: JSON.stringify({
        workflow: { id: "wf_68fe85decfcc81909935373882b42533063dc33f37cd476c" },
        user: deviceId,
        version: "draft"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { client_secret } = await response.json();
    return client_secret;
  } catch (error) {
    console.error('Error getting ChatKit session token:', error);
    throw error;
  }
}

// Função para criar sessão do ChatKit (para uso em servidor se necessário)
export async function createChatKitSession(deviceId: string) {
  try {
    const client_secret = await getChatKitSessionToken(deviceId);
    return { client_secret };
  } catch (error) {
    console.error('Error creating ChatKit session:', error);
    throw error;
  }
}
