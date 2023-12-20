import { getFileContent } from '../../utils/tool.js'

// 模版数据
const templateList = getFileContent('../../file/template.txt')

// 导出
export const promptActions = [
  {
    type: 'list',
    name: 'mode',
    message: '请选择操作：',
    choices: [
      { value: 'add', name: '新增模版' },
      { value: 'delete', name: '删除模版' },
      { value: 'edit', name: '编辑模版' },
      { value: 'view', name: '查看模版' },
      { value: 'upload', name: '上传模版文件' },
      { value: 'download', name: '下载模版文件' }
    ]
  },
  {
    type: 'input',
    name: 'templateName',
    message: '模版名称：',
    validate: (val) => {
      if (!val) return '模版名称不能为空'
      else if (templateList.filter((v) => v.templateName === val).length > 0) return '当前模版名称已经存在'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add') return true
      return false
    }
  },
  {
    type: 'input',
    name: 'templateUrl',
    message: '模版地址：',
    validate: (val) => {
      if (!val) return '模版地址不能为空'
      else if (templateList.filter((v) => v.templateUrl === val).length > 0) return '当前模版地址已经存在'
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
    message: '模版描述：',
    validate: (val) => {
      if (!val) return '模版描述不能为空'
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
    message: '请选择要删除的模版：',
    choices: templateList.map((item, index) => ({ value: index.toString(), name: item.templateName })),
    when: (answers) => {
      if (answers.mode === 'delete' && templateList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'index',
    message: '请选择要编辑的模版：',
    choices: templateList.map((item, index) => ({ value: index.toString(), name: item.templateName })),
    when: (answers) => {
      if (answers.mode === 'edit' && templateList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'templateName',
    message: '模版名称：',
    validate: (val) => {
      if (!val) return '模版名称不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && templateList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'templateUrl',
    message: '模版地址：',
    validate: (val) => {
      if (!val) return '模版地址不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && templateList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'desc',
    message: '模版描述：',
    validate: (val) => {
      if (!val) return '模版描述不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && templateList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'filePath',
    message: '文件的系统绝对路径：',
    validate: (val) => {
      if (val.indexOf('.txt') === -1) return '请上传一个.txt文件，格式：[{"templateName":"","templateUrl":"","desc":""}]'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'upload') return true
      return false
    }
  }
]
