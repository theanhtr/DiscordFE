import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';

class BaseService {
  protected baseUrl: string;
  protected resource: string;

  constructor() {
    this.baseUrl = environment.API_BASE_URL;
    this.resource = '';
  }

  async post<T>(endpoint: string = '', data: any): Promise<T> {
    const url = `${this.baseUrl}/${this.resource}/${endpoint}`;
    const response: AxiosResponse<T> = await axios.post(url, data);
    return response.data;
  }

  async put<T>(endpoint: string = '', id: string, data: any): Promise<T> {
    const url = `${this.baseUrl}/${this.resource}/${id}/${endpoint}`;
    const response: AxiosResponse<T> = await axios.put(url, data);
    return response.data;
  }

  async get<T>(endpoint: string = ''): Promise<T> {
    const url = `${this.baseUrl}/${this.resource}/${endpoint}`;
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  }

  async delete<T>(endpoint: string = '', id: string): Promise<T> {
    const url = `${this.baseUrl}/${this.resource}/${id}/${endpoint}`;
    const response: AxiosResponse<T> = await axios.delete(url);
    return response.data;
  }
}

export default BaseService;
