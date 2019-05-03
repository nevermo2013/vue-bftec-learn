import request from '@/api/request'

//执行登录
function getDormList(data){
  return request ({
    url: '/admin/xy/dorm/list',
    method:'get',
    data
  })
}

export default {
	getDormList
}