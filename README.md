# Description

![version](https://img.shields.io/badge/version-v0.0.1-brightgreen)
![golang-version](https://img.shields.io/badge/Go-1.14-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Some description to follow...

## Database ER Diagram

![db-diagram](./infra/er-diagram/ftstats-db.svg)

### Helpful queries and commands to identify issues

```shell script
# Connect to the database
docked exec -it <postgres container> sh
psql -h localhost -U admin -d ftstats
```

```sql
-- Identify leagues and seasons with wrong match start datetime defined.
select league_id, season_code, count(*) from match where start_datetime = '0001-01-01 00:00:00' group by league_id, season_code;

-- Get total number of leagues and seasons stored in match table.
select count(*) from (select league_id, season_code from match group by league_id, season_code) t

-- Get number of matches per league per season.
select league.name, season.range, count(*) from match join league on league.id = match.league_id join season on season.code = match.season_code group by league.name, season.range;

-- Get total number of matches per country, league and season.
select country.name, league.name, league.code, season.range, count(*) from match join league on league.id = match.league_id join country on country.id = league.country_id join season on season.code = match.season_code group by country.name, league.name, league.code, season.range order by country.name, league.code, season.range;
```
