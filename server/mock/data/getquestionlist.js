/*
 * 生成问卷列表
 */
const Mock = require('mockjs')
const Random = Mock.Random

const questionList = (len = 10, isDelete = false) => {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push({
      id: Random.id(),
      title: Random.ctitle(),
      isPublish: Random.boolean(),
      isStar: Random.boolean(),
      count: Random.natural(0, 100),
      createdAt: Random.datetime(),
      createdBy: Random.cname(),
      isDelete
    })
  }
  return list
}

module.exports = questionList
