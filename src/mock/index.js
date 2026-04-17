// 定义规则,拦截请求,返回数据
import Mock from 'mockjs'
// 引入拼音库
import PinyinMatch from 'pinyin-match'

// 1.定义数据模板
const userList = []
for (let i = 0; i < 180; i++) {
  userList.push(
    Mock.mock({
      'id|1000-9999': 1,
      name: '@cname',
      'gender|1': ['男', '女'],
      phone: /^1[3-9]\d{9}$/,
      email: '@email',
      'role|1': ['超级管理员', '普通用户', '编辑', '财务'],
      'status|1': [0, 1],
      createTime: '@date',
    }),
  )
}

// 2.拦截请求
Mock.mock('/api/user/list', 'get', (options) => {
  // 解析 URL 中的查询参数
  const url = options.url
  // const params = { phone: 135 }
  const phone = 13593568630
  const name = '旭阳'
  const status = '1'

  console.log(options)
  console.log(url.includes('?'))

  // 进行本地的数据过滤
  let result = userList.filter((item) => {})

  return {
    code: 200,
    msg: '获取成功...',
    data: userList,
  }
})

export default Mock
