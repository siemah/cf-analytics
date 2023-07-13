# cloudflare worker as website analytics

This worker save extract some infos about your users such as location, device details, preferred language, browser details...
You can extend it to build something like a google analytics by adding some cookies.
I used this as base code to build a feature to see the vistors of my clients websites instead of using a google analytics(which his size is more than the website page i am talking about an ecommerce website).

## Getting Started

To deploy or run localy follow these steps:

- Install dependencies
- Create a D1 database 
```shell
  npx wrangler d1 create <db name>
```

- Create KV namespace
```shell
  npx wrangler kv:namespace create <kv namespace>
```
- Generate DB schema(sql file needed to create table/run migration) using [drizzle orm](https://orm.drizzle.team/docs/)
```shell
  yarn run db:migration
```
- Run DB schema
```shell
  # locally
  npx wrangler d1 execute views_analytics --local --file=./src/db/migration/name-of-new-generated-file.sql
  # production
  npx wrangler d1 execute views_analytics --file=./src/db/migration/name-of-new-generated-file.sql
```
- Now start :cook::cook:

### Cloudflare "colo"

To get details about the colo code use [this repo](https://github.com/Netrvin/cloudflare-colo-list/blob/main/DC-Colos.json)


# RoadMap

- [x] Save views by timestamp of the current day
- [x] Save all the details in a [cloudflare KV](https://developers.cloudflare.com/workers/wrangler/workers-kv/)
- [x] Create a cron job using [cloudflare schedule event](https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/#scheduledevent) to run each hour and save the new views in a Database ([via cloudflare D1](https://developers.cloudflare.com/d1/))

  - [x] Create a D1 database
  - [x] Bind it to the current worker
  - [x] Write a sql query to create a DB if not exists
  - [x] Save a new stats to the DB

- [x] Remove the old data after saving them into a database.
- [x] Integrate a third APM service(party) 