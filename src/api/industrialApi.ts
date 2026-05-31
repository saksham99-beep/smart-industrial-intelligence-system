export const fetchMachineStatus = async () => {
  const response = await fetch("http://127.0.0.1:8000/machine-status");

  if (!response.ok) {
    throw new Error("Failed to fetch machine status");
  }

  return response.json();
};

export const askIndustrialAI = async (query: string) => {
  const response = await fetch("http://127.0.0.1:8000/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI response");
  }

  return response.json();
};

export const predictFailure = async (
  temperature: number,
  vibration: number,
  pressure: number
) => {
  const response = await fetch(
    "http://127.0.0.1:8000/predict-failure",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature,
        vibration,
        pressure,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Prediction API failed");
  }

  return response.json();
};