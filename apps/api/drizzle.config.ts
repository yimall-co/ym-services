import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
    path: '.env.local',
});

export default defineConfig({
    schema: './src/contexts/**/**/infrastructure/persistence/drizzle/*.table{.ts,.js}',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
