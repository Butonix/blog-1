/**
 * Created by scriptchao on 2017/11/22.
 */

const splitLocation = (location) => {
    const data = {};
    const { search } = location;

    search.slice(1).split('&').map((value) => {
        const [a, b] = value.split('=');
        data[a] = b;
        return true;
    });

    return data;
};


export default splitLocation;
