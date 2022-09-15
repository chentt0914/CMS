import {request} from './request'

export function getUserList(param) {
  return request({
    url:"users/list",
    method:"POST",
    data:{...param}
  })
}

// 创建用户
export function addUser(){
  return request({
    url:"users",
    method:"POST",
  })
}

// 查询某个用户
export function getUser(param){
  return request({
    url:`users/${param}`,
    method:"GET",
    param:{...param}
  })
}

// 修改用户
export function editUser(param){
  return request({
    url:`users/${param}`,
    method:"PATCH",
    data:{...param}
  })
}
