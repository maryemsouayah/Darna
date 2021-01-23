import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const http = jest.fn();
  let data: any;
  beforeEach(() => {
    //service = new LoginService(http as any);
  });
  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
