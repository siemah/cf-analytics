# cloudflare worker as website analytics

This worker save extract some infos about your users such as location, device details, preferred language, browser details...
You can extend it to build something like a google analytics by adding some cookies.
I used this as base code to build a feature to see the vistors of my clients websites instead of using a google analytics(which his size is more than the website page i am talking about an ecommerce website).

### Cloudflare "colo"

To get details about the colo code use [this repo](https://github.com/Netrvin/cloudflare-colo-list/blob/main/DC-Colos.json)


# RoadMap

- [x] Save views by timestamp of the current day
- [x] Save all the details in a [cloudflare KV](https://developers.cloudflare.com/workers/wrangler/workers-kv/)
- [x] Create a cron job using [cloudflare schedule event](https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/#scheduledevent) to run each hour and save the new views in a Database ([via cloudflare D1](https://developers.cloudflare.com/d1/))
- [ ] Remove the old data after saving them into a database.