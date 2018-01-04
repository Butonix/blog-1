/**
 * Created by scriptchao on 2017/11/29.
 */


import Article from '../models/article';
import Tag from '../models/tag';
import Vote from '../models/vote';

export function getCount() {

    return Tag.find({})
        .then((data) => {
            if (data) {
                return Promise.all(
                    data.map(item => Article.count({ tags: { $all: item.name }, isPublish: true })
                        .then(count => Tag.update({ name: item.name }, { count })
                            .then((data1) => {
                                if (data1.n) {
                                    return data1.n;
                                }
                                return false;
                            })))
                );
            }
            return false;
        });
}

export function getVoteCount(articleId) {

    return Vote.count({ articleId, isVote: true })
        .then(count => Article.update({ articleId }, { voteCount: count })
            .then((data) => {
                if (data.n) {
                    return data;
                }
                return false;
            }));
}
