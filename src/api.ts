import axios from "axios";
import { API_BASE_URL } from "./config";

interface TokenResponse {
  token: string;
}

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  status: string;
}

export async function getAuthToken(): Promise<string> {
  const response = await axios.post<TokenResponse>(
    `${API_BASE_URL}/auth/login`,
    {
      username: "testusernametest",
    }
  );
  return response.data.token;
}

export async function getClients(authToken: string): Promise<Client[]> {
  const response = await axios.get<Client[]>(`${API_BASE_URL}/clients`, {
    headers: {
      Authorization: authToken,
    },
    params: {
      limit: 1000,
      offset: 1000,
    },
  });
  return response.data;
}
