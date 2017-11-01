/**
 * Created by scriptchao on 2017/11/1.
 */

const Username = /^\w{6,16}$/; //6-16位字符!

const Password = /^[a-zA-Z]\w{5,15}$/; //字母开头的6-16位字符

export {
    Username,
    Password,
}