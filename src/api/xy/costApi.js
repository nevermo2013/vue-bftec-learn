import request from '@/api/request'

//执行登录
function getCostList(data){
  return request ({
    url: '/admin/xy/cost/list',
    method:'get',
    data
  })
}

export default {
	getCostList
}