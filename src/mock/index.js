// 定义规则,拦截请求,返回数据
import Mock from 'mockjs'
// 引入拼音库
import PinyinMatch from 'pinyin-match'


// 初始化数据库
// 生成一批固定数据,方便后续操作
let userList=Mock.mock({
  'data|50':[{
    'id|1000-9999': 1,
    name: '@cname',
    'gender|1': ['男', '女'],
    phone: /^1[3-9]\d{9}$/,
    email: '@email',
    'role|1': ['超级管理员', '普通用户', '编辑', '财务'],
    'status|1': [0, 1],
    createTime: '@date',
  }]
}).data;



// 2.拦截请求
Mock.mock(/\/api\/user\/list\/?/, 'get', (options) => {
  // 解析 URL 中的查询参数
  const url = options.url

  const params = {}
  if (url.includes('?')) {
    url
      .split('?')[1]
      .split('&')
      .forEach((item) => {
        const [key, value] = item.split('=')
        params[key] = value ? decodeURIComponent(value) : ''
      })
  }
  // 获取参数
  const { keyword, phone, status } = params

  // 进行本地的数据过滤
  let result = userList.filter((item) => {
    // 手机号筛选
    const matchPhone = !phone || item.phone.includes(phone)
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
      // 拼音匹配
      const hasPinyin = PinyinMatch.match(item.name, keyword)

      // 只要满足其中一项,就算匹配成功
      matchKeyword = hasEnglish || hasChinese || hasPinyin
    }
    return matchPhone && matchStatus && matchKeyword
  })

  return {
    code: 200,
    msg: '获取成功...',
    data: result,
    total: result.length,
  }
})

// 模拟新增用户
Mock.mock('/api/user/create', 'post', (options) =>{
  const body=JSON.parse(options.body)

  // 模拟生成新 ID
  const maxId = Math.max(...userList.map(u=>u.id),1000)
  const newUser={
    id: maxId+1,
    name: body.name,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    role: body.role,
    status: Number(body.status), // 确保是数字
    createTime: new Date().toISOString().split('T')[0]
  }

  // 核心:将新数据推入数据库
  userList.unshift(newUser)
  return {
    code:200,
    msg:'新增成功',
    data:newUser
  }
})


// 模拟批量删除用户
Mock.mock('/api/user/delete', 'post', (options)=>{
  const body = JSON.parse(options.body)
  const ids = body.ids

  if (!ids || ids.length===0){
    return {
      code: 400,
      msg:'请选择想要删除的用户'
    }
  }

  // 核心:过滤掉被删除的 ID
  userList = userList.filter(item=>!ids.includes(item.id))

  return {
    code:200,
    msg:`成功删除 ${ids.length} 条数据`,
    data:null
  }
})


export default Mock
