/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './footer.sass';
import beian from '../../img/beian.png'


@observer
export default class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <p className="copyright">© 2017-2018 scriptchao.com 版权所有 ICP证 : 浙ICP备17059730号-1</p>
                <p>
                    <img src={beian}/>
                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?spm=5176.8142029.631162.98.22449968rWQgOr&recordcode=33010602008935"
                        rel="noopener noreferrer"
                        target="_blank">浙公网安备 33010602008935号</a>
                </p>
            </footer>
        );
    }
}
