export interface TestCase<T> {
  name: string;
  data: T;
  expectedStatus: number;
  tags?: string[];
}
