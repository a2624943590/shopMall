import request from '../../../utils/request.js' //封装的请求库
//登录接口
export function home(params){
  return request({ url: '/web/home',method: 'post',data: params})
}
