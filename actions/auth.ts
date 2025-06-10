export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(
    "http://localhost:8080/v1/authentication/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();
  console.log(data.data);
  return data.data; // Assuming the API returns the token in `data.data`
}

export function setTokenInCookies(token: string): void {
  document.cookie = `authToken=${token}; path=/; max-age=259200`; // Store token in cookies
}
