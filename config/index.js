/**
 * Created by scriptchao on 2017/10/26.
 */

const devHost = '127.0.0.1';
// const prodHost = '127.0.0.1';
const prodHost = 'www.scriptchao.xyz';
const devPort = 8080;
const prodPort = 8080;


export default {
    host: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    port: process.env.NODE_ENV === 'development' ? devPort : prodPort,
    apiHost: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    apiPort: 7070,
    dbHost: '127.0.0.1',
    dbPort: '27017'
};
