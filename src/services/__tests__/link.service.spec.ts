import { jest } from '@jest/globals';
import { LinkService } from '../link.service.js';
import { CodeGenerator, LinkRepository } from '../../types.js';

describe('LinkService', () => {
  let mockLinkRepository: jest.Mocked<LinkRepository>;
  let mockCodeGenerator: jest.Mocked<CodeGenerator>;
  let linkService: LinkService;

  beforeEach(() => {
    mockLinkRepository = {
      save: jest.fn(),
    } as jest.Mocked<LinkRepository>;

    mockCodeGenerator = {
      generate: jest.fn().mockReturnValue('abc123'),
    } as jest.Mocked<CodeGenerator>;

    linkService = new LinkService(mockLinkRepository, mockCodeGenerator);
  });

  it('should create and return a short link for a valid URL', async () => {
    // arrange
    const originalUrl = 'https://www.example.com/some/long/url';
    const expectedLinkObject = {
      id: 'mock-id',
      originalUrl: originalUrl,
      shortCode: 'abc123',
      createdAt: new Date(),
    };

    mockLinkRepository.save.mockResolvedValue(expectedLinkObject);

    // act
    const result = await linkService.create(originalUrl);

    // assert
    expect(result).toEqual(expectedLinkObject);
    expect(mockLinkRepository.save).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.save).toHaveBeenCalledWith({
      originalUrl: originalUrl,
      shortCode: 'abc123',
    });
  });

  it('should generate a short code and pass it to the repository when creating a link', async () => {
    const originalUrl = 'https://www.example.com/some/long/url';
    const expectedShortCode = 'xyz789';

    mockCodeGenerator.generate.mockReturnValue(expectedShortCode);

    await linkService.create(originalUrl);

    expect(mockCodeGenerator.generate).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.save).toHaveBeenCalledWith({
      originalUrl: originalUrl,
      shortCode: expectedShortCode,
    });
  });
});
