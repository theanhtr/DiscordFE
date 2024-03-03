import BaseService from './BaseService';
import { TestModel } from '../models/TestModel';

class TestService extends BaseService {
  constructor() {
    super();
    this.resource = 'test';
  }

  async getTest(): Promise<TestModel[]> {
    return await this.get();
  }
}

export default TestService;
