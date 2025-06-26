import express from 'express';
import { appRouter } from '@/components/appRouter';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { loggerMiddleware } from '@/middlewares/logger';
import { connectMongoose } from '@/lib/mongoose';

const createApp = () => {
  const app = express();
  const port = process.env.PORT;

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);
  app.use(appRouter);
  app.use(errorMiddleware);

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};

connectMongoose(createApp);
