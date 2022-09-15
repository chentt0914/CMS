import {request} from './request'

export function login(param) {
  return request({
    url:"login",
    method:"POST",
    data:{...param}
  })
}
