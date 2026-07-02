import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log(
      `[${new Date().toISOString()}] [INFO] ${context ? `[${context}]` : ''} ${message}`,
    );
  }

  error(message: string, trace?: string, context?: string) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] ${context ? `[${context}]` : ''} ${message}${trace ? `\n${trace}` : ''}`,
    );
  }

  warn(message: string, context?: string) {
    console.warn(
      `[${new Date().toISOString()}] [WARN] ${context ? `[${context}]` : ''} ${message}`,
    );
  }
}
