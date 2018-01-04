/**
 * Created by scriptchao on 2017/11/1.
 */

const Username = /^\w{5,16}$/; // 5-16位字符!

const Password = /^[a-zA-Z]\w{4,15}$/; // 字母开头的5-16位字符

export {
    Username,
    Password,
};