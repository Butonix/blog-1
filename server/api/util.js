/**
 * Created by scriptchao on 2017/11/29.
 */


import Article from '../models/article'
import Tag from '../models/tag'

export function getCount() {

    Tag.find({}).then(data => {
        if (data) {
            data.map((item, index) => {
                Article.count({tags: {$all: item.name}, isPublish: true}).then(count => {
                    console.log(count);
                    Tag.update({name: item.name}, {count: count}).then(data => {
                        if (data.n) {
                            console.log('更新成功!')
                        }
                    })
                })
            })
        }
    })
}
