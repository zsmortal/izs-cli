import { getFileContent } from '../../utils/tool.js'

// 项目数据
const projectList = getFileContent('../../file/project.txt')
// 服务器数据
const serverList = getFileContent('../../file/server.txt')

// 导出
export const promptActions = [
  {
    type: 'list',
    name: 'projectIndex',
    message: '请选择要部署的项目：',
    choices: projectList.map((item, index) => ({ value: index.toString(), name: `${item.projectName}     ${item.localDir} upload to ${item.remoteDir}` })),
    when: () => {
      if (projectList.length > 0) return true
      return false
    }
  },
  {
    type: 'list',
    name: 'serverIndex',
    message: '请选择目标服务器：',
    choices: serverList.map((item, index) => ({ value: index.toString(), name: item.host })),
    when: () => {
      if (serverList.length > 0) return true
      return false
    }
  }
]
