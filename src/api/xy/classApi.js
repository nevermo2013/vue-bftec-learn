import request from '@/api/request'

//执行登录
function getClassList(data){
  return request ({
    url: '/admin/xy/clazz/list',
    method:'get',
    data
  })
}

export default {
	getClassList
}