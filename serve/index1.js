const Koa = require('koa')
// 使用直接执行 就不需要new
const router = require('koa-router')()
const cors = require('koa-cors')
const { koaBody } = require('koa-body')

const app = new Koa()
app.use(cors())
app.use(
	koaBody({
		multipart: true
	})
)
let index = 0
router.get('/getList', ctx => {
	const query = ctx.query
	console.log(query)
	if (index % 2) {
		ctx.body = {
			code: 1,
			data: {
				name: 'get',
				age: 20
			},
			msg: 'success'
		}
	} else {
		let timer = setTimeout(() => {
			ctx.body = {
				code: 0,
				data: {
					name: 'get',
					age: 30
				},
				msg: 'success'
			}
		}, 2000)
		clearTimeout(timer)
	}
	index++
})
// 动态路由
router.post('/postList', ctx => {
	const body = ctx.request.body
	console.log(body)
	ctx.body = {
		code: 1,
		data: {
			name: 'post',
			age: 18
		},
		msg: 'success'
	}
})

router.put('/putList', ctx => {
	const body = ctx.request.body
	console.log(body)
	ctx.body = {
		code: 0,
		data: {
			name: 'put',
			age: 18
		},
		msg: 'success'
	}
})

router.delete('/deleteList', ctx => {
	const body = ctx.request.body
	console.log(body)
	ctx.body = {
		code: 1,
		data: {
			name: 'delete',
			age: 18
		},
		msg: 'success'
	}
})

router.patch('/patchList', ctx => {
	const body = ctx.request.body
	console.log(body)
	ctx.body = {
		code: 1,
		data: {
			name: 'patch',
			age: 18
		},
		msg: 'success'
	}
})

// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, () => {
	console.log('http://localhost:8000')
})
