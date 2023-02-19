import { request, request1 } from './config'

interface IP {
	name: string
	age: number
}

export const getList = (data: IP) =>
	request<IP, number>({
		url: '/getList',
		method: 'get',
		data,
		desc: '获取列表成功',
		interceptors: {
			requestInterceptors: config => {
				config.headers.single = 'outer'
				console.log('打印***单个接口请求拦截', config)
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

export const postList = (data: IP) =>
	request1<IP, number>({
		url: '/postList',
		method: 'post',
		data,
		desc: '获取列表成功',
		interceptors: {
			requestInterceptors: config => {
				console.log('打印***单个接口请求拦截', config)
				config.headers.single = 'outer'
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

export const putList = (data: IP) =>
	request<IP, number>({
		url: '/putList',
		method: 'put',
		data,
		desc: 'put获取列表成功',
		interceptors: {
			requestInterceptors: config => {
				console.log('打印***单个接口请求拦截', config)
				config.headers.single = 'outer'
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

export const deleteList = (data: IP) =>
	request<IP, number>({
		url: '/deleteList',
		method: 'delete',
		data,
		desc: 'delete获取列表成功',
		interceptors: {
			requestInterceptors: config => {
				console.log('打印***单个接口请求拦截', config)
				config.headers.single = 'outer'
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})

export const patchList = (data: IP) =>
	request<IP, number>({
		url: '/patchList',
		method: 'patch',
		data,
		interceptors: {
			requestInterceptors: config => {
				console.log('打印***单个接口请求拦截', config)
				config.headers.single = 'outer'
				return config
			},
			responseInterceptors: res => {
				if (res.data) {
					console.log('打印***单个接口响应拦截', res)
				}
				return res
			}
		}
	})
