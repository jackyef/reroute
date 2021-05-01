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
