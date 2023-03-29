// 定义基础路径
const BASE_URL = 'http://127.0.0.1:8000'

const myUpload = (obj) => {
	return new Promise((resolve,reject)=>{
		const str = obj.url.slice(0,3)
		const token = uni.getStorageSync('token')
		if(str==='/my'&&token===''){
			uni.showToast({
				title: '未登录！',
			})
		}else{
			uni.uploadFile({
				url:`${BASE_URL}${obj.url}`,
				filePath:obj.filePath || '',
				name:obj.name || '',
				header:{
					Authorization:uni.getStorageSync('token') || ''
				},
				success: (res) => {
					if(res.data.message == "身份认证失败！"){
						uni.navigateTo({
							url:'/pages/Login/Login'
						})
					}
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		}
	})
}

export default myUpload