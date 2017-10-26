/**
 * Created by scriptchao on 2017/10/26.
 */

import IndexRoute from '../components/index/route'


const merge = (...args) => Array.prototype.concat.apply([], args);

export default merge(
    IndexRoute,
)
