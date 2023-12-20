import inquirer from 'inquirer' // 命令行参数输入交互
import chalk from 'chalk' // 美化终端字符
import ora from 'ora' // 终端加载动画
import symbols from 'log-symbols' // 信息前面加 ✔ 或 ✖
import gitclone from 'git-clone' // 远程下载 git 模块
import shell from 'shelljs' // 终端相关命令
import { promptCover, promptActions } from './actions.js'
import { getFileContent, isFileExisted, getNowPath } from '../../utils/tool.js'
const templateList = getFileContent('../../file/template.txt')

// 导出
export const createProject = (appName) => {
  try {
    if (templateList.length <= 0) {
      console.log(symbols.warning, chalk.yellow('您还没有模版，请先添加模版！'))
      process.exit()
    }
    if (isFileExisted(appName)) {
      inquirer
        .prompt(promptCover)
        .then((answers) => {
          if (answers.projectCover) {
            const initSpinner = ora('正在移除原有目录...').start()
            try {
              shell.rm('-rf', getNowPath(appName))
              initSpinner.succeed(chalk.green('原有目录移除成功')).stop()
              initProject(appName)
            } catch {
              initSpinner.fail(chalk.red('原有目录移除失败')).stop()
              process.exit()
            }
          } else {
            console.log(symbols.error, chalk.red(`error: 创建失败，项目【${appName}】已存在，请重命名后创建`))
            process.exit()
          }
        })
        .catch((error) => {
          console.log(symbols.error, chalk.red(`error：${error}`))
          process.exit()
        })
    } else {
      initProject(appName)
    }
  } catch {
    process.exit()
  }
}

// 初始化项目
const initProject = (appName) => {
  try {
    inquirer
      .prompt(promptActions)
      .then((answers) => {
        const initSpinner = ora('正在下载模板...').start()
        gitclone(answers.templateUrl, getNowPath(appName), { checkout: 'master', shallow: true }, (err) => {
          if (err) {
            initSpinner.fail(chalk.red(`模板下载失败：${new Error(err)}`)).stop()
            process.exit()
          } else {
            initSpinner.succeed(chalk.green('模版下载成功')).stop()
            shell.rm('-rf', `${getNowPath(appName)}/.git`)
            shell.cd(appName)
            console.log(chalk.yellow('正在安装项目依赖...'))
            if (answers.type === 'npm') shell.exec('npm install')
            else if (answers.type === 'yarn') shell.exec('yarn')
            else if (answers.type === 'cnpm') shell.exec('cnpm install')
            else if (answers.type === 'pnpm') shell.exec('pnpm install')
            else shell.exec('npm install')
            console.log(symbols.success, chalk.green('success：项目创建完成'))
            process.exit()
          }
        })
      })
      .catch((error) => {
        console.log(symbols.error, chalk.red(`error：${error}`))
        process.exit()
      })
  } catch {
    process.exit()
  }
}
