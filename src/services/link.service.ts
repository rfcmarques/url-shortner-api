import type { Link, LinkRepository, CodeGenerator } from '../types.js';

export class LinkService {
  constructor(
    protected readonly linkRepository: LinkRepository,
    protected readonly codeGenerator: CodeGenerator,
  ) {}

  async create(originalUrl: string): Promise<Link> {
    const shortCode = this.codeGenerator.generate();
    const newLink = this.linkRepository.save({ originalUrl, shortCode });

    return newLink;
  }
}
