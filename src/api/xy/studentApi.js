import request from '@/api/request'

//执行登录
function getStudentList(data){
  return request ({
    url: '/admin/xy/student/list',
    method:'get',
    data
  })
}
function getStudentById(data){
  return request ({
    url: '/admin/xy/student/detail',
    method:'get',
    data
  })
}
function saveStudent(data){
  return request ({
    url: '/admin/xy/student/save',
    method:'post',
    data
  })
}
function updateStudent(data){
  return request ({
    url: '/admin/xy/student/update',
    method:'post',
    data
  })
}
function delStudent(data){
  return request ({
    url: '/admin/xy/student/del',
    method:'get',
    data
  })
}

export default {
  getStudentList,
  getStudentById,
  saveStudent,
  updateStudent,
  delStudent
}