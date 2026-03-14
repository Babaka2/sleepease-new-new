import { auth } from '../lib/firebaseClient';

const BASE_URL = 'http://localhost:8000'; // Update with actual backend URL if needed

async function getAuthHeader() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`
  };
}

export const api = {
  async getStreak() {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/logs/streak`, { headers });
    return response.json();
  },

  async getSleepIndex() {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/analytics/sleep_index`, { headers });
    return response.json();
  },

  async getPersona() {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/analytics/persona`, { headers });
    return response.json();
  },

  async logMood(mood: string, note?: string) {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/logs/mood`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, note })
    });
    return response.json();
  },

  async getGratitudeLogs() {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/logs/gratitude`, { headers });
    return response.json();
  },

  async chat(message: string, mode: 'general' | 'islamic' = 'general') {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode })
    });
    return response.json();
  }
};