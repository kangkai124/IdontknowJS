const Koa = require('koa');
const views = require('koa-views');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
const router = KoaRouter();

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(bodyParser());

router.get('/', async (ctx) => {
  await ctx.render('index');
})

router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(6066, () => {
  console.log('app running at localhost:6066');
});
