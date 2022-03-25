import { PrismaClient } from '@prisma/client';

import cities from './seeds/cities.seed.json';
import countries from './seeds/countries.seed.json';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
    await prisma.country.createMany({
        data: countries,
        skipDuplicates: true,
    });
    await prisma.city.createMany({
        data: cities,
        skipDuplicates: true,
    });
}

main()
    .catch(console.error)
    .finally(async () => {
        // Disconnect Prisma Client
        await prisma.$disconnect();
    });
