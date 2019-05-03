import request from '@/api/request'

//执行登录
function doLogin(data){
  return request ({
    url: '/admin/login/doLogin',
    method:'post',
    data
  })
}
//获取用户明细
function getUserInfo(data){
  return request ({
    url: '/admin/login/getUserInfo',
    method:'get',
    data
  })
}
//获取用户明细
function doLogout(data){
  return request ({
    url: '/admin/login/doLogOut',
    method:'get',
    data
  })
}

export default {
	doLogin,
	getUserInfo,
	doLogout
}