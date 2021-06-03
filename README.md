# reroute

A service to shorten URLs. Only meant for personal use!

Code is open-sourced so it can serve as a reference.

## How it works

- Client sends request to `/api/add-redirect?url={url}`
- Server responds with `{ rerouteId: 'someId' }`
- Server updates the `vercel.json` content in this repository
- Client tries sending requests to `/{rerouteId}` until it gets a `308` response

## Installing `dracula-ui`

This project is using `dracula-ui`, which is not an open source software.
If you have a GitHub account with access to `dracula-ui` repo, you can
follow the installation steps for `dracula-ui` which involves creating a custom
`.npmrc` file.


## Setting up
### Setting up PlanetScale (MySQL DB)
- [Install planetscale CLI](https://github.com/planetscale/cli#installation)
- Login to planetscale
  ```
  pscale auth login
  ```
- Update the planetscale database schema
   - `pscale database create reroute`
   - `pscale branch create reroute dev` (this is the dev DB)
   - `pscale branch create reroute main` (this is the prod DB)
   - `pscale shell reroute dev` (get a shell session to the dev branch)
      - Copy paste the command in `db/setup.sql` to create the table we need

### Setting up Prisma as MySQL client
- `yarn add prisma @prisma/client`
- `npx prisma init`
- `yarn dev`
- Update `.env` with the value logged in console after running `yarn dev`:
  ```
  DATABASE_URL="mysql://root@127.0.0.1:3306/reroute"
  ```
- `npx prisma db pull`, allow prisma update the schema file according to the DB server)
- `npx prisma generate`, allow prisma to generate the `prisma-client` inside `node_modules`
- `yarn db:seed`, seed the DB with some records