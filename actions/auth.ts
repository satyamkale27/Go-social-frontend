import axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(
      "https://goapi.satyamkale.site/v1/authentication/token",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data; // Assuming the API returns the token in `data.data`
  } catch (error: any) {
    throw error;
  }
};

export const setTokenInCookies = (token: string): void => {
  document.cookie = `authToken=${token}; path=/; max-age=259200`; // Store token in cookies
};
export const removeTokenInCookies = (): void => {
  document.cookie = `authToken=; path=/; max-age=0`; // Clear the authToken cookie
};

export const registerUser = async (userDetail: object): Promise<string> => {
  try {
    const response = await axios.post(
      "https://goapi.satyamkale.site/v1/authentication/user",
      userDetail,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Assuming the API returns some data in `data.data`
  } catch (error: any) {
    throw error;
  }
};

export const activateUserByToken = async (token: string) => {
  try {
    const response = await axios.put(
      `https://goapi.satyamkale.site/v1/users/activate/${token}`
    );
  } catch (error: any) {
    throw error;
  }
};
