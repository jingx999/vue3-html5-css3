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
Mock.mock(/\/api\/user\/list\/?/, 'get', (options) => {
  console.log('请求拦截成功...')
  // 解析 URL 中的查询参数
  const url = options.url
  // const params = { phone: 135 }
  console.log(url)
  const phone = ''
  // const name = '杨'
  const status = '1'
  const keyword = '杨'

  console.log(options, '111111111111222222333333333')
  // console.log(url.includes('?'))

  // 进行本地的数据过滤
  let result = userList.filter((item) => {
    // 手机号筛选
    const matchPhone = !phone || item.phone.includes(phone)
    // console.log(matchPhone, item)
    // 状态筛选
    const matchStatus = !status || item.status == status
    // 用户名称搜索
    let matchKeyword = true
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      // 包含英文或数字
      const hasEnglish = item.name.toLowerCase().includes(lowerKeyword)
      // 包含汉字
      const hasChinese = item.name.includes(keyword)
      matchKeyword = hasEnglish || hasChinese
    }
    return matchPhone && matchStatus && matchKeyword
  })
  console.log(result)

  return {
    code: 200,
    msg: '获取成功...',
    data: result,
    total: result.length,
  }
})

export default Mock
