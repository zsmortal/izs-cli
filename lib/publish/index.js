import inquirer from 'inquirer' // 命令行参数输入交互
import ora from 'ora' // 终端加载动画
import chalk from 'chalk' // 美化终端字符
import symbols from 'log-symbols' // 信息前面加 ✔ 或 ✖
import Client from 'ssh2-sftp-client' // ssh 连接服务器
import { promptActions } from './actions.js'
import { getFileContent } from '../../utils/tool.js'
const projectList = getFileContent('../../file/project.txt')
const serverList = getFileContent('../../file/server.txt')

// 导出
export const publishProject = () => {
  try {
    inquirer.prompt(promptActions).then((answers) => {
      if (projectList.length <= 0) {
        console.log(symbols.warning, chalk.yellow('没有项目数据，请先添加再进行项目部署操作！'))
        process.exit()
      }
      if (serverList.length <= 0) {
        console.log(symbols.warning, chalk.yellow('没有服务器数据，请先添加再进行项目新增操作！'))
        process.exit()
      }
      var initSpinner = null
      const sftp = new Client()
      sftp
        .connect({
          host: serverList[answers.serverIndex].host,
          port: serverList[answers.serverIndex].port,
          username: serverList[answers.serverIndex].userName,
          password: serverList[answers.serverIndex].passWord
        })
        .then(() => {
          console.log(symbols.success, chalk.green('Finish: 服务器连接成功'))
          initSpinner = ora('正在部署...').start()
          return sftp.uploadDir(projectList[answers.projectIndex].localDir, projectList[answers.projectIndex].remoteDir)
        })
        .then((data) => {
          console.log(data)
          initSpinner.succeed(chalk.green('项目部署成功')).stop()
        })
        .catch((err) => {
          initSpinner.fail(chalk.red(`上传失败：${new Error(err)}`)).stop()
        })
        .finally(() => {
          sftp.end()
        })
    })
  } catch {
    process.exit()
  }
}
