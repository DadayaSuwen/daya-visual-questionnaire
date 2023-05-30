/*
 * 生成问卷列表
 */
const Mock = require('mockjs')
const Random = Mock.Random

const questionList = (opt = {}) => {
  const { len = 10, isDelete = false, isStar = Random.boolean() } = opt
  const list = []
  for (let i = 0; i < len; i++) {
    list.push({
      id: Random.id(),
      title: Random.ctitle(),
      isPublish: Random.boolean(),
      isStar,
      count: Random.natural(0, 100),
      createdDate: Random.datetime(),
      createdBy: Random.cname(),
      isDelete
    })
  }
  return list
}

module.exports = questionList
