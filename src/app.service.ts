import { Injectable } from '@nestjs/common';
import { CONSTANTS } from './utils/constants';

@Injectable()
export class AppService {
  getHealth() {
    return {
      name: CONSTANTS.APPLICATION_NAME,
      running: true,
    };
  }
}
