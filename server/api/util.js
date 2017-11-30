/**
 * Created by scriptchao on 2017/11/29.
 */


import Article from '../models/article'
import Tag from '../models/tag'

export function getCount() {

    return Tag.find({}).then(data => {
        if (data) {
            return Promise.all(
                data.map((item, index) => {
                    return Article.count({tags: {$all: item.name}, isPublish: true}).then(count => {
                        return Tag.update({name: item.name}, {count: count}).then(data => {
                            if (data.n) {
                                return data.n
                            }
                        })
                    })
                }))
        }
    })
}
