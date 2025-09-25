import { Request, Response, Router } from "express";
import { LinkService } from "../services/link.service.js";

export function createLinkRouter(linkService: LinkService) {
    const router = Router();

    router.post('/', async(req: Request, res: Response) => {
        try {
            const { originalUrl } = req.body;

            if (!originalUrl) {
                return res.status(400).json({ error: 'Invalid or missing originalUrl' });
            }

            if (typeof originalUrl !== 'string' || !/^https?:\/\/.+\..+/.test(originalUrl)) {
                return res.status(400).json({ error: 'Invalid URL format' });
            }

            const newLink = await linkService.create(originalUrl);
            return res.status(201).json(newLink);
        } catch (error) {
            console.error('Error creating link:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    return router;
}