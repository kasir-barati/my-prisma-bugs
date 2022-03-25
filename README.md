# How to start project

1. `cp .env.example e.env` and `cp .postgresql.env.example .postgresql.env`
2. Fix their values as you want
    - Generally you want to change the exposed port of Docker
3. `docker-compose up --build`

You should see this in terminal after `npm run start:dev`:

```cmd
> my-prisma-bugs@1.0.0 start:dev
> export DEBUG=prisma:* && ts-node ./index.ts

  prisma:tryLoadEnv Environment variables loaded from /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/.env +0ms
  prisma:tryLoadEnv Environment variables loaded from /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/.env +4ms
  prisma:client dirname /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/.prisma/client +0ms
  prisma:client relativePath ../../../prisma +0ms
  prisma:client cwd /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/prisma +0ms
  prisma:client clientVersion: 3.11.1 +5ms
  prisma:client clientEngineType: library +0ms
  prisma:client:libraryEngine internalSetup +0ms

                SELECT  *, POSITION(
                    LOWER('Ch')
                    IN
                    LOWER(nameEn)
                ) AS indexOfTheSearchedName FROM cities
                WHERE nameEn
                    ILIKE '%Ch%'
                ORDER BY
                    indexOfTheSearchedName ASC,
                    internationalPriority ASC;

  prisma:client prisma.$executeRaw(
  prisma:client                 SELECT  *, POSITION(
  prisma:client                     LOWER('$1')
  prisma:client                     IN
  prisma:client                     LOWER($2)
  prisma:client                 ) AS indexOfTheSearchedName FROM cities
  prisma:client                 WHERE $3
  prisma:client                     ILIKE '%$4%'
  prisma:client                 ORDER BY
  prisma:client                     indexOfTheSearchedName ASC,
  prisma:client                     $5 ASC;
  prisma:client             , ["Ch","nameEn","nameEn","Ch","internationalPriority"]) +39ms
  prisma:client Prisma Client call: +3ms
  prisma:client Prisma Client call: +26ms
  prisma:client prisma.executeRaw({
  prisma:client   query: '\n                SELECT  *, POSITION(\n                    LOWER(\'$1\') \n                    IN \n                    LOWER($2)\n                ) AS indexOfTheSearchedName FROM cities\n                WHERE $3 \n                    ILIKE \'%$4%\'\n                ORDER BY \n                    indexOfTheSearchedName ASC, \n                    $5 ASC;\n            ',
  prisma:client   parameters: {
  prisma:client     values: '["Ch","nameEn","nameEn","Ch","internationalPriority"]',
  prisma:client     __prismaRawParamaters__: true
  prisma:client   }
  prisma:client }) +3ms
  prisma:client Generated request: +0ms
  prisma:client mutation {
  prisma:client   executeRaw(
  prisma:client     query: "\n                SELECT  *, POSITION(\n                    LOWER('$1') \n                    IN \n                    LOWER($2)\n                ) AS indexOfTheSearchedName FROM cities\n                WHERE $3 \n                    ILIKE '%$4%'\n                ORDER BY \n                    indexOfTheSearchedName ASC, \n                    $5 ASC;\n            "
  prisma:client     parameters: "[\"Ch\",\"nameEn\",\"nameEn\",\"Ch\",\"internationalPriority\"]"
  prisma:client   )
  prisma:client }
  prisma:client  +0ms
  prisma:client:libraryEngine sending request, this.libraryStarted: false +72ms
  prisma:client:libraryEngine Searching for Query Engine Library in /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/.prisma/client +107ms
  prisma:client:libraryEngine loadEngine using /media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node +1ms
  prisma:client:libraryEngine library starting +9ms
  prisma:client:libraryEngine library started +140ms
  prisma:client:request_handler Error: Raw query failed. Code: `42P18`. Message: `db error: ERROR: could not determine data type of parameter $1`
  prisma:client:request_handler     at prismaGraphQLToJSError (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:33922:12)
  prisma:client:request_handler     at Object.request (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:35748:17)
  prisma:client:request_handler     at async Object.request (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:39788:24)
  prisma:client:request_handler     at async Proxy._request (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:40649:18) +0ms
PrismaClientKnownRequestError:
Invalid `prisma.executeRaw()` invocation:


  Raw query failed. Code: `42P18`. Message: `db error: ERROR: could not determine data type of parameter $1`
    at Object.request (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:39818:15)
    at async Proxy._request (/media/user/2DE701966937BBDE/Projects/spad.co/my-prisma-bugs/node_modules/@prisma/client/runtime/index.js:40649:18) {
  code: 'P2010',
  clientVersion: '3.11.1',
  meta: {
    code: '42P18',
    message: 'db error: ERROR: could not determine data type of parameter $1'
  }
}
END............
  prisma:client:libraryEngine library stopping +23ms
  prisma:client:libraryEngine library stopped +4ms
  prisma:client:libraryEngine hookProcess received: beforeExit +1ms
  prisma:client:libraryEngine runBeforeExit +0ms
  prisma:client:libraryEngine hookProcess received: exit +0ms
```

And in the postgres you should see something like this:

```cmd
postgres_1  | 2022-03-25 12:58:38.611 UTC [112] STATEMENT:
postgres_1  |                   SELECT  *, POSITION(
postgres_1  |                       LOWER('$1')
postgres_1  |                       IN
postgres_1  |                       LOWER($2)
postgres_1  |                   ) AS indexOfTheSearchedName FROM cities
postgres_1  |                   WHERE $3
postgres_1  |                       ILIKE '%$4%'
postgres_1  |                   ORDER BY
postgres_1  |                       indexOfTheSearchedName ASC,
postgres_1  |                       $5 ASC;
postgres_1  |
```

Really weird for me.
