import request from '@/api/request'

//执行登录
function getStudentList(data){
  return request ({
    url: '/admin/xy/student/list',
    method:'get',
    data
  })
}

export default {
	getStudentList
}