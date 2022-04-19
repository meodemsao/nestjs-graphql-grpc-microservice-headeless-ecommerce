import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceOrderService {
  getHello(): string {
    return 'Hello World!';
  }
}
