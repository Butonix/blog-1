/**
 * Created by scriptchao on 2017/10/26.
 */

export default {
    host: '127.0.0.1',
    port: process.env.NODE_ENV === 'development' ? 8080 : 9090,
    apiHost: '127.0.0.1',
    apiPort: 6666,
}
