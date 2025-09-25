import { LinkService } from './services/link.service.js';
import { Link, LinkRepository } from './types.js';
import { CodeGenerator } from './utils/CodeGenerator.js';
import { createLinkRouter } from './routes/link.router.js';
import app from './app.js';

const inMemoryDatabase: Link[] = [];
const linkRepository: LinkRepository = {
  save: async (data) => {
    const newLink: Link = {
      id: new Date().getTime().toString(),
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      createdAt: new Date(),
    };
    inMemoryDatabase.push(newLink);
    return newLink;
  },
};

const codeGenerator = new CodeGenerator();
const linkService = new LinkService(linkRepository, codeGenerator);

const linkRouter = createLinkRouter(linkService);
app.use('/links', linkRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
