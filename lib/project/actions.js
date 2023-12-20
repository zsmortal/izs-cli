import { getFileContent } from '../../utils/tool.js'

// 服务器数据
const serverList = getFileContent('../../file/server.txt')
// 项目数据
const projectList = getFileContent('../../file/project.txt')

// 导出
export const promptActions = [
  {
    type: 'list',
    name: 'mode',
    message: '请选择模式：',
    choices: [
      { value: 'add', name: '新增项目' },
      { value: 'delete', name: '删除项目' },
      { value: 'edit', name: '编辑项目' },
      { value: 'view', name: '查看项目' },
      { value: 'upload', name: '上传项目文件' },
      { value: 'download', name: '下载项目文件' }
    ]
  },
  {
    type: 'input',
    name: 'projectName',
    message: '项目名称：',
    validate: (val) => {
      if (!val) return '项目名称不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'desc',
    message: '项目描述：',
    validate: (val) => {
      if (!val) return '项目描述不能为空（或项目中文名称）'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'localDir',
    message: '本地打包文件目录：',
    validate: (val) => {
      if (!val) return '本地打包文件目录不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'remoteDir',
    message: '远程文件部署目录：',
    validate: (val) => {
      if (!val) return '远程文件部署目录不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'add' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'host',
    message: '请选择要部署的服务器：',
    choices: serverList.map((item) => ({ value: item.host, name: item.host })),
    when: (answers) => {
      if (answers.mode === 'add' && serverList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'index',
    message: '请选择要删除的项目：',
    choices: projectList.map((item, index) => ({ value: index.toString(), name: item.projectName })),
    when: (answers) => {
      if (answers.mode === 'delete' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'index',
    message: '请选择要编辑的项目：',
    choices: projectList.map((item, index) => ({ value: index.toString(), name: item.projectName })),
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'projectName',
    message: '项目名称：',
    validate: (val) => {
      if (!val) return '项目名称不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'desc',
    message: '项目描述：',
    validate: (val) => {
      if (!val) return '项目描述不能为空（或项目中文名称）'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'localDir',
    message: '本地打包文件目录：',
    validate: (val) => {
      if (!val) return '本地打包文件目录不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'remoteDir',
    message: '远程文件部署目录：',
    validate: (val) => {
      if (!val) return '远程文件部署目录不能为空'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'host',
    message: '请选择要部署的服务器：',
    choices: serverList.map((item) => ({ value: item.host, name: item.host })),
    when: (answers) => {
      if (answers.mode === 'edit' && projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'input',
    name: 'filePath',
    message: '文件的系统绝对路径：',
    validate: (val) => {
      if (val.indexOf('.txt') === -1) return '请上传一个.txt文件，格式：[{"projectName":"","desc":"","localDir":"","remoteDir":"","host":""}]'
      return true
    },
    when: (answers) => {
      if (answers.mode === 'upload') return true
      return false
    }
  }
]
