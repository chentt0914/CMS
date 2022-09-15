import {request} from './request'

export function getMenu() {
  return request({
    url:`role/${localStorage.getItem('id')}/menu`,
    method:"GET",
  })
}
