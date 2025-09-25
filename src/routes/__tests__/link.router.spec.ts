import { jest } from '@jest/globals';
import request from 'supertest';
import { LinkService } from '../../services/link.service.js';
import { createLinkRouter } from '../link.router.js';
import { Link } from '../../types.js';
import app from '../../app.js';

const mockLinkService: jest.Mocked<LinkService> = {
  create: jest.fn(),
} as unknown as jest.Mocked<LinkService>;

app.use('/links', createLinkRouter(mockLinkService));

describe('POST /links', () => {
  it('should respond with 201 Created and return the created link object', async () => {
    const originalUrl = 'https://www.example.com/some/long/url';
    const expectedLink: Link = {
      id: 'mock-id',
      originalUrl: originalUrl,
      shortCode: 'abc123',
      createdAt: new Date(),
    };

    mockLinkService.create.mockResolvedValue(expectedLink);

    const response = await request(app).post('/links').send({ originalUrl: originalUrl });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      ...expectedLink,
      createdAt: expectedLink.createdAt.toISOString(),
    });

    expect(mockLinkService.create).toHaveBeenCalledTimes(1);
    expect(mockLinkService.create).toHaveBeenCalledWith(originalUrl);
  });
});
