import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1/database';

// Middleware
app.use(express.json());

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
