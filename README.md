### Patmos

![Alt Text](https://media.giphy.com/media/rAm0u2k17rM3e/giphy.gif)

## Getting started

- `npm i -g yarn`
- clone this repo

## Firing it up

- `npm run docker`
- `npm run services`
- `npm run admin` for admin
- `npm run site` for site

## Resetting

### Reset docker completely incl. volumes

- `npm run reset-infra`

## Notes

### Access Postgres from ternimal

- `docker exec -it [docker container id] psql -U postgres`
