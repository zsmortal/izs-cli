import { getFileContent } from '../../utils/tool.js'

// 模版数据
const templateList = getFileContent('../../file/template.txt')

// 导出
export const promptCover = [
  {
    type: 'confirm',
    message: '目录下存在相同名字的文件夹，是否覆盖？',
    name: 'projectCover',
    default: 'true'
  }
]
export const promptActions = [
  {
    type: 'list',
    name: 'templateUrl',
    message: '请选择要创建的模板：',
    choices: templateList.map((item) => ({ value: item.templateUrl, name: item.templateName }))
  },
  {
    type: 'input',
    name: 'version',
    message: '版本号：',
    default: '1.0.0'
  },
  {
    type: 'input',
    name: 'description',
    message: '项目描述：',
    default: ''
  },
  {
    type: 'input',
    name: 'author',
    message: '作者：',
    default: ''
  },
  {
    type: 'list',
    name: 'type',
    message: '请选择包管理器：',
    choices: [
      { value: 'npm', name: 'npm' },
      { value: 'yarn', name: 'yarn' },
      { value: 'cnpm', name: 'cnpm' },
      { value: 'pnpm', name: 'pnpm' }
    ]
  }
]
