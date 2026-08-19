import { Injectable } from '@nestjs/common';
import { log } from 'node:console';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from app.service.ts';
  }
}
