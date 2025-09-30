import { prisma } from '../../../lib/db.js';
import { PrismaLinkRepository } from '../PrismaLinkRepository.js';


describe('PrismaLinkRepository', () => {
    afterEach(async () => {
        await prisma.link.deleteMany();
    })

    it('should save a new link in the database and return it', async () => {
        const repository = new PrismaLinkRepository();
        const data = {
            originalUrl: 'https://example.com',
            shortCode: 'exmpl'
        };

        const link = await repository.save(data);

        expect(link.id).toEqual(expect.any(String));
        expect(link.originalUrl).toBe(data.originalUrl);
        expect(link.shortCode).toBe(data.shortCode);
        expect(link.createdAt).toBeInstanceOf(Date);
    });

    it('should fail if trying to save a link with a duplicate shortCode', async () => {
        const repository = new PrismaLinkRepository();
        const data = {
            originalUrl: 'https://example.com',
            shortCode: 'exmpl'
        };

        await repository.save(data);

        await expect(repository.save(data)).rejects.toThrow();
    });
});