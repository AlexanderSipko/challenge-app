const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Challenges API
  async getChallenges() {
    return this.request('/api/challenges');
  }

  async getChallenge(id: number) {
    return this.request(`/api/challenges/${id}`);
  }

  async createChallenge(data: any) {
    return this.request('/api/challenges', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChallenge(id: number, data: any) {
    return this.request(`/api/challenges/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteChallenge(id: number) {
    return this.request(`/api/challenges/${id}`, {
      method: 'DELETE',
    });
  }

  async joinChallenge(id: number) {
    return this.request(`/api/challenges/${id}/join`, {
      method: 'POST',
    });
  }

  async getHealth() {
    return this.request('/api/health');
  }
}

export const apiClient = new ApiClient();