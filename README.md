### Patmos

![Alt Text](https://media.giphy.com/media/rAm0u2k17rM3e/giphy.gif)

## Getting started

- clone this repo

## Firing it up

- `docker-compose up --build`

## Resetting

### Reset docker completely incl. volumes

- `docker-compose down && docker volume prune -f`

## Notes

### Access Postgres from ternimal

- `docker exec -it [docker container id] psql -U postgres`
