/**
 * Created by scriptchao on 2017/10/26.
 */

export default {
    host: '127.0.0.1',
    port: process.env.NODE_ENV === 'development' ? 8080 : 80,
    apiHost: process.env.NODE_ENV === 'developemnt' ? '127.0.0.1' : '101.132.163.117',
    apiPort: 7070,
    dbHost: '127.0.0.1',
    dbPort: '27017'
}
