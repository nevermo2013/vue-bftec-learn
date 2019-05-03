import request from '@/api/request'

//这里是获取文章列表
function test(data){
  return request ({
    url: '/api/admin/test',
    method:'get',
    data
  })
}

export default {
	test
}