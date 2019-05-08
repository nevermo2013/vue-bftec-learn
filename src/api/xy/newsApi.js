import request from '@/api/request'

//获取新闻列表
function list(data){
  return request ({
    url: '/admin/xy/news/list',
    method:'get',
    data
  })
}

function save(data){
    return request ({
      url: '/admin/xy/news/save',
      method:'post',
      data
    })
  }

  
function update(data){
    return request ({
      url: '/admin/xy/news/update',
      method:'post',
      data
    })
  }
  

export default {
    list,
    save,
    update
}