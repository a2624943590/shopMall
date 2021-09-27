//返回上一页
function $back(to = '-1') {
  this.$router.go(to);
}

//跳转全局函数 name:url：路径名称 paraams:代表传递参数  type:1
function $navto(name, params = {}, type = 1) {
  if (type == 1) {
    //兼容以前我的路由
    this.$router.push(name, params);
  } else {
    //通过路由组件参数
    this.$router.push({
      name: name,
      params: params
    })
  }
}



//本地缓存
function $cache_set(name, params) {
  localStorage.setItem(name, JSON.stringify(params));
}

//本地缓存
function $cache_get(name) {
  let item = localStorage.getItem(name);
  if (item != null && item != '') {
    return JSON.parse(item);
  }
}

//获取购物数量
function $cartnum() {
  let cart = localStorage.getItem('cart');
  if (cart != null && cart != '') {
    return JSON.parse(cart).length;
  } else {
    return 0;
  }
}
//获取当前时间
function $getCurrentTime() {

  var _this = this;
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let hh = new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  _this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
  return _this.gettime;
}
//数组对象属性值查找
export function findItem(array,attr,val){
  for(let i = 0;i < array.length;i++){
      if(array[i][attr] == val){
          return i
      }
  }
  return -1
}
export default {
  $navto,
  $getCurrentTime,
  $back,
  $cache_set,
  $cache_get,
  $cartnum
}
