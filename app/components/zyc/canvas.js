/**
 * Created by scriptchao on 2017/10/30.
 */
/* eslint-disable */
import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { createPortal } from 'react-dom'
import './canvas.sass'

@observer
export default class Canvas extends React.Component {


    componentWillMount() {
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }

    componentDidMount() {

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let cw = canvas.width = window.innerWidth;
        let ch = canvas.height = window.innerHeight;


        let dots = [];
        let mouseArea = { x: null, y: null, max: 20000 };

        for (let i = 0; i < 60; i++) {
            let x = cw * Math.random();
            let y = ch * Math.random();
            let xv = Math.random() * 2 - 1;
            let yv = Math.random() * 2 - 1;
            dots.push({
                x: x,
                y: y,
                xv: xv,
                yv: yv,
                max: 6000
            })
        }


        function begin() {
            ctx.clearRect(0, 0, cw, ch);

            let lines = [mouseArea].concat(dots);

            dots.map(function (dot) {

                dot.x += dot.xv;
                dot.y += dot.yv;

                dot.xv *= (dot.x > cw || dot.x < 0) ? -1 : 1;
                dot.yv *= (dot.y > ch || dot.y < 0) ? -1 : 1;

                ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

                lines.map(function (line) {

                    if (!(dot === line || line.x === null)) {
                        let xd = dot.x - line.x;
                        let yd = dot.y - line.y;

                        let dis = xd * xd + yd * yd;

                        let ratio;

                        if (dis < line.max) {

                            if (line === mouseArea && dis > (line.max / 2)) {

                                dot.x -= 0.03 * xd;
                                dot.y -= 0.03 * yd;
                            }

                            ratio = (line.max - dis) / line.max;

                            ctx.beginPath();
                            ctx.lineWidth = ratio / 6;
                            ctx.strokeStyle = `hsla(0,30%,0,${ratio - 0.1})`;
                            ctx.moveTo(dot.x, dot.y);
                            ctx.lineTo(line.x, line.y);
                            ctx.stroke()

                        }
                    }

                });

                lines.splice(lines.indexOf(dot), 1)
            });

            window.requestAnimationFrame(begin);
        }

        begin();


        window.addEventListener('mousemove', function (e) {
            mouseArea.x = e.clientX;
            mouseArea.y = e.clientY;


        });

        window.addEventListener('mouseout', function () {
            mouseArea.x = null;
            mouseArea.y = null;
        });


        window.addEventListener('resize', () => {
            cw = canvas.width = window.innerWidth;
            ch = canvas.height = window.innerHeight;
        });

    }


    render() {

        return (
            createPortal(<canvas id="canvas" className="com-canvas">{null}</canvas>, this.node)

        )
    }
}

