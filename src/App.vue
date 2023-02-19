<template>
	<button @click="handleClick">发送get请求</button>
	<button @click="handlePostClick">发送post请求</button>
	<button @click="handlePutClick">发送put请求</button>
	<button @click="handleDeleteClick">发送delete请求</button>
	<button @click="handleCancel">取消所有</button>

	<div>postInfo:{{ postInfo ?? '111' }}</div>

	<div>getInfo:{{ getInfo ?? '222' }}</div>
	<div>putInfo:{{ putInfo ?? '333' }}</div>
	<div>deleteInfo:{{ deleteInfo ?? '444' }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import abort from '@sunrisecn/axios-abort'
import { getList, postList, putList, deleteList } from './api/home'

const getInfo = ref()
const handleClick = async () => {
	const res = await getList({ name: 'jack', age: 18 })
	console.log('打印***res---getList', res)
	getInfo.value = res.data
}

const postInfo = ref()
const handlePostClick = async () => {
	const res = await postList({ name: 'jack', age: 18 })
	postInfo.value = res.data
}
const putInfo = ref()
const handlePutClick = async () => {
	const res = await putList({ name: 'jack', age: 18 })
	putInfo.value = res.data
}
const deleteInfo = ref()
const handleDeleteClick = async () => {
	const res = await deleteList({ name: 'jack', age: 18 })
	deleteInfo.value = res.data
}

const handleCancel = () => {
	abort.removeAll()
}
</script>
<style scoped></style>
