import { prisma } from '../../lib/db.js'; // Importamos a nossa instância do Prisma
import type { Link, LinkRepository } from '../../types.js';

export class PrismaLinkRepository implements LinkRepository {
    async save(data: { originalUrl: string; shortCode: string }): Promise<Link> {
        const newLink = await prisma.link.create({
            data: {
                originalUrl: data.originalUrl,
                shortCode: data.shortCode,
            },
        });
        return newLink;
    }
}