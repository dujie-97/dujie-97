import Cookies from 'js-cookie';

// 设置cookie
export function setCookie(info) {
  const arr = Object.entries(info); // 把对象以数组的形式拆分成[[key,value],...]
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }

  return true;
}

// 获取用户的cookie
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

// 移除cookie
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
