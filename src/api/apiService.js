import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Method to set headers dynamically
  setHeaders(headers) {
    this.api.defaults.headers = { ...this.api.defaults.headers, ...headers };
  }

  // Method to perform GET request
  async get(url, headers = {}) {
    try {
      const response = await this.api.get(backendApi+url, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to perform POST request
  async post(url, data, headers = {}) {
    console.log(url);
    try {
      const response = await this.api.post(backendApi+url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to perform PUT request
  async put(url, data, headers = {}) {
    try {
      const response = await this.api.put(backendApi+url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to perform DELETE request
  async delete(url, headers = {}) {
    try {
      const response = await this.api.delete(backendApi+url, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to perform PATCH request
  async patch(url, data, headers = {}) {
    try {
      const response = await this.api.patch(backendApi+url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  handleError(error) {
    // Customize error handling as needed
    console.error('API call failed. Error: ', error);
    throw error;
  }
}

// Usage: create an instance of ApiService with your API base URL
const apiService = new ApiService('http://localhost:9090/');
const backendApi = 'http://localhost:9090';
export default apiService;
