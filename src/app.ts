import * as Koa from 'koa'
import * as Router from 'koa-router'
import Got from "got"
import * as Mercury from "@postlight/mercury-parser"

const fetch = Got.extend({
  headers: {
    "user-agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
  }
})

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 3000

router.get('/', async (ctx) => {
  ctx.body = 'proxy ok'
})

router.get('/got', async (ctx) => {
  const { url } = ctx.query
  const data = await fetch(url)
  ctx.body = data
})

router.get('/parse', async (ctx) => {
  const { url, type = 'markdown' } = ctx.query
  const data = await Mercury.parse(url, {
    contentType: type,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    },
  })
  ctx.body = data
})

app.use(router.routes())
app.listen(port)