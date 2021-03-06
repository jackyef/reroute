# reroute

A service to shorten URLs. Only meant for personal use!

Code is open-sourced so it can serve as a reference.

## How it works

- Client sends request to `/api/add-redirect?url={url}`
- Server responds with `{ rerouteId: 'someId' }`
- Server adds a new entry to the DB hosted on [PlanetScale](https://planetscale.com/)
- Client tries sending requests to `/{rerouteId}` until it gets a `308` response, making sure that the redirect is now in place.

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
   - `pscale database create reroute --region ap-southeast`
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

## Deploying on Vercel
Add [the official integration](https://vercel.com/integrations/planetscale) to the respective Vercel's project.
It will take care of injecting the required environment variables.

## Updating DB schema
- If there are any changes to the DB schema, we should create a new deploy request
  ```
  pscale deploy-request create reroute dev
  ```
  Think of it like creating a PR to merge the `dev` branch to the `main` branch, except
  it is `deploy-request` in PlanetScale's term.

- If there are conflicts, it should be resolved.
- Once everything is fine, deploy the deploy-request by running
  ```
  pscale deploy-request deploy reroute <deploy-request-number>
  ```
