import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Triss!';
  }
  getTriss(): string {
    return 'Tris';
  }
}
