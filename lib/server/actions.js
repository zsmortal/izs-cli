import { getFileContent } from '../../utils/tool.js'

// 服务器数据
const serverList = getFileContent('../../file/server.txt')

// 导出
export const promptActions = [
  {
    type: 'list',
    name: 'mode',
    message: '请选择模式：',
    choices: [
      { value: 'add', name: '新增服务器' },
      { value: 'delete', name: '删除服务器' },
      { value: 'edit', name: '编辑服务器' },
      { value: 'view', name: '查看服务器' },
      { value: 'upload', name: '上传服务器文件' },
      { value: 'download', name: '下载服务器文件' }
    ]
  },
  {
    type: 'input',
    name: 'host',
    message: '服务器IP地址：',
    validate: (val) => {
      if (!val) return '服务器IP地址不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'input',
    name: 'port',
    message: '服务器端口号：',
    validate: (val) => {
      if (!val) return '服务器端口号不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'input',
    name: 'desc',
    message: '服务器描述：',
    validate: (val) => {
      if (!val) return '服务器描述不能为空（如线上/测试服务器）'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'input',
    name: 'userName',
    message: '服务器账号：',
    validate: (val) => {
      if (!val) return '服务器账号不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'input',
    name: 'passWord',
    message: '服务器密码：',
    validate: (val) => {
      if (!val) return '服务器密码不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'list',
    name: 'index',
    message: '请选择要删除的服务器：',
    choices: serverList.map((item, index) => ({ value: index.toString(), name: item.host })),
    when: (answers) => {
      if (answers.mode === 'delete' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'index',
    message: '请选择要编辑的服务器：',
    choices: serverList.map((item, index) => ({ value: index.toString(), name: item.host })),
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'host',
    message: '服务器IP地址：',
    validate: (val) => {
      if (!val) return '服务器IP地址不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'port',
    message: '服务器端口号：',
    validate: (val) => {
      if (!val) return '服务器端口号不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'desc',
    message: '服务器描述：',
    validate: (val) => {
      if (!val) return '服务器描述不能为空（如线上/测试服务器）'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'userName',
    message: '服务器账号：',
    validate: (val) => {
      if (!val) return '服务器账号不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'passWord',
    message: '服务器密码：',
    validate: (val) => {
      if (!val) return '服务器密码不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'filePath',
    message: '文件的系统绝对路径：',
    validate: (val) => {
      if (val.indexOf('.txt') === -1) return '请上传一个.txt文件，格式：[{"host":"","port":"","desc":"","userName":"","passWord":""}]'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'upload') return true
      return false
    }
  }
]
