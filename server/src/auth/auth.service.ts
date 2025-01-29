import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return `returns user and token`;
  }
}
