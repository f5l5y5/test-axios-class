import type { RequestConfig, CustomRequired, IBaseRes } from '../request/types'
import type { AxiosResponse, AxiosError } from 'axios'
import setApiConfig from '../request'
import abort from '@sunrisecn/axios-abort'
import { notification } from 'ant-design-vue'

const config: CustomRequired<RequestConfig, 'baseURL'> = {
	baseURL: 'http://localhost:3000',
	timeout: 1000 * 60 * 5,
	interceptors: {
		requestInterceptors: config => {
			config.signal = abort.add({ url: config.url!, method: config.method! })
			abort.judge({ url: config.url!, method: config.method! })
			return config
		},
		requestInterceptorsCatch: error => {
			return Promise.reject(error)
		},
		responseInterceptors: response => {
			// 添加提示
			notify.onFulfilled(response)
			abort.remove({ url: response.config.url!, method: response.config.method! })
			return response
		},
		responseInterceptorsCatch: error => {
			// 错误提示
			notify.onRejected(error)
			return Promise.reject(error)
		}
	}
}

const config1: CustomRequired<RequestConfig, 'baseURL'> = {
	baseURL: 'http://localhost:8000',
	timeout: 1000 * 60 * 5,
	interceptors: {
		requestInterceptors: config => {
			return config
		},
		requestInterceptorsCatch: error => {
			return Promise.reject(error)
		},
		responseInterceptors: response => {
			return response
		},
		responseInterceptorsCatch: error => {
			return Promise.reject(error)
		}
	}
}
// 接口成功或失败的提示
const notify = {
	onFulfilled: (response: AxiosResponse<IBaseRes>) => {
		const { code, msg } = response.data
		const { desc, method } = response.config as RequestConfig
		// 如果desc被定义，则执行反馈逻辑
		// 判断code码 1是成功
		if (code === 1 && desc) {
			// 判断是否需要显示
			notification.success({
				message: `${desc}成功`
			})
			// 是 0 且需要失败提醒 才展示
		} else if (code === 0) {
			notification.error({
				message: `${desc}错误`,
				description: `原因：${msg}`
			})
		}
	},
	onRejected: (error: AxiosError) => {
		const { response, config } = error
		// 对4xx，5xx状态码做失败反馈
		const { url, desc } = config as RequestConfig
		if (!desc) {
			return Promise.reject(error)
		}
		if (response?.status && response?.statusText) {
			notification.error({
				message: `${desc}错误`,
				description: `状态：${response.status}~${response.statusText}
                路径：${url}`
			})
		} else {
			// 处理请求响应失败,例如网络offline，超时等做失败反馈
			notification.error({
				message: `${desc}失败`,
				description: `原因:${error.message}路径：${url}`
			})
		}
	}
}

export const request = setApiConfig(config)
export const request1 = setApiConfig(config1)
