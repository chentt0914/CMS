import {request} from './request'

export function getGoodsCount() {
  return request({
    url:"goods/category/count",
    method:"GET",
  })
}

export function getGoodsAddressSale(){
  return request({
    url:"/goods/address/sale",
    method:"GET",
  })
}
export function getGoodsSale(){
  return request({
    url:"/goods/category/sale",
    method:"GET",
  })
}

export function getGoodsFavor(){
  return request({
    url:"/goods/category/favor",
    method:"GET",
  })
}
