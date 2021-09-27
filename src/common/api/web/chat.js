import request from '../../../utils/request.js' //封装的请求库
//聊天列表接口
export function historyList(params={}){
  return request({ url: '/web/msgList',method: 'post',data: params})
}

//聊天发送接口
export function sendMsg(params={}){
  return request({ url: '/web/sendMsg',method: 'post',data: params})
}

//聊天接收接口
export function getMsg(params={}){
  return request({ url: '/web/getMsg',method: 'post',data: params})
}
