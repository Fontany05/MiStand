import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Server } from 'http';

interface AuthResponseBody {
  token: string;
  entrepreneur: {
    id: string;
    email: string;
    name: string;
    standName: string;
  };
}

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();

    httpServer = app.getHttpServer() as Server;
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.entrepreneur.deleteMany();
    await app.close();
  });

  afterEach(async () => {
    await prisma.entrepreneur.deleteMany();
  });

  describe('POST /auth/register', () => {
    it('should register a new entrepreneur', async () => {
      const response = await request(httpServer).post('/auth/register').send({
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: '123456',
        standName: 'Stand de Ana',
        phone: '1234567890',
      });

      const body = response.body as AuthResponseBody;
      expect(response.status).toBe(201);
      expect(body.token).toBeDefined();
      expect(body.entrepreneur.email).toBe('ana@gmail.com');
    });

    it('should return 400 if email already exists', async () => {
      await request(httpServer).post('/auth/register').send({
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: '123456',
        standName: 'Stand de Ana',
        phone: '1234567890',
      });

      const response = await request(httpServer).post('/auth/register').send({
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: '123456',
        standName: 'Stand de Ana',
        phone: '1234567890',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should login successfully', async () => {
      await request(httpServer).post('/auth/register').send({
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: '123456',
        standName: 'Stand de Ana',
        phone: '1234567890',
      });

      const response = await request(httpServer).post('/auth/login').send({
        email: 'ana@gmail.com',
        password: '123456',
      });

      const body = response.body as AuthResponseBody;
      expect(response.status).toBe(201);
      expect(body.token).toBeDefined();
    });

    it('should return 401 if credentials are invalid', async () => {
      const response = await request(httpServer).post('/auth/login').send({
        email: 'noexiste@gmail.com',
        password: '123456',
      });

      expect(response.status).toBe(401);
    });
  });
});
