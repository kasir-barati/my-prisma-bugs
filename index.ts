import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
    const filters = {
        query: 'Ch',
        // country: ''
    };
    const isEnglish = /[a-zA-Z]/.test(filters.query[0]);
    const lowerFieldName = isEnglish ? 'nameEn' : 'nameFa';
    const orderByFieldName = isEnglish
        ? 'internationalPriority'
        : 'domesticPriority';
    const rawQuery = `
                SELECT  *, POSITION(
                    LOWER('${filters.query}') 
                    IN 
                    LOWER(${lowerFieldName})
                ) AS indexOfTheSearchedName FROM cities
                WHERE ${lowerFieldName} 
                    ILIKE '%${filters.query}%'
                ORDER BY 
                    indexOfTheSearchedName ASC, 
                    ${orderByFieldName} ASC;
            `;

    console.log(rawQuery);

    // No one of this syntax works:
    // #1
    // const allCities = await prisma.$queryRaw`
    // #2
    // const allCities = await prisma.$executeRaw`
    //             SELECT  *, POSITION(
    //                 LOWER('${filters.query}')
    //                 IN
    //                 LOWER(${lowerFieldName})
    //             ) AS indexOfTheSearchedName FROM cities
    //             WHERE ${lowerFieldName}
    //                 ILIKE '%${filters.query}%'
    //             ORDER BY
    //                 indexOfTheSearchedName ASC,
    //                 ${orderByFieldName} ASC;
    //         `;
    // #3
    // const allCities =
    //     await prisma.$queryRaw(Prisma.sql`SELECT  *, POSITION(
    //         LOWER('${filters.query}')
    //         IN
    //         LOWER(${lowerFieldName})
    //     ) AS indexOfTheSearchedName FROM cities
    //     WHERE ${lowerFieldName}
    //         ILIKE '%${filters.query}%'
    //     ORDER BY
    //         indexOfTheSearchedName ASC,
    //         ${orderByFieldName} ASC;`);

    // This one throw different error
    // #3
    const allCities = await prisma.$queryRawUnsafe(
        "SELECT  *, POSITION(LOWER('?') IN LOWER(?)) AS indexOfTheSearchedName FROM cities WHERE ? ILIKE '%?%' ORDER BY indexOfTheSearchedName ASC, ? ASC;",
        filters.query,
        lowerFieldName,
        lowerFieldName,
        filters.query,
        orderByFieldName,
    );

    console.dir(allCities, { depth: null });
}

main()
    .catch(console.error)
    .finally(async () => {
        console.log('END............');
        await prisma.$disconnect();
    });
