const Koa = require('koa')
const Router = require('koa-router')
const mockslist = require('./mock')
const app = new Koa()
const router = new Router()

async function getRes(fn){
  return new Promise(resolve => { 
    setTimeout(() => {
      const res = fn()
      resolve(res)
     },100)
  })
}

mockslist.forEach(item => {
  const { url, method, response } = item
  router[method](url, async ctx => {
    const res = await getRes(response)
    ctx.body = res
  })
})

app.use(router.routes())
app.listen(3001)