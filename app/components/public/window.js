/**
 * Created by scriptchao on 2017/11/27.
 */

// 文档的总高度
export function getScrollHeight() {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

// 浏览器视口的高度
export function getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function scroll() {
    if (window.pageYOffset != null) {
        // 支持IE9 +
        return {
            left: window.pageXOffset,
            top: window.pageYOffset,
        }
    } else if (document.compatMode === 'CSS1Compat') {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop,
        }
    }
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
    }
}


// 滚动条在X或Y轴上的滚动距离
export const getScrollXY = (() => {
    let sLeft = scroll().left;
    let sTop = scroll().top;

    return () => {
        let type;
        let distance;


        if (sTop !== scroll().top) {
            sTop = scroll().top;
            type = 'y';
            distance = sTop;

        }
        if (sLeft !== scroll().left) {
            sLeft = scroll().left;
            type = 'x';
            distance = sLeft;
        }

        return {
            type,
            distance,
        }
    }
})();

