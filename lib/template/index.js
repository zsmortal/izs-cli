import inquirer from 'inquirer' // 命令行参数输入交互
import fs from 'fs-extra' // 文件操作
import chalk from 'chalk' // 美化终端字符
import symbols from 'log-symbols' // 信息前面加 ✔ 或 ✖
import shell from 'shelljs' // 终端相关命令
import { promptActions } from './actions.js'
import { getFileContent, getFilePath, getHomeDir } from '../../utils/tool.js'
const templateList = getFileContent('../../file/template.txt')
const templatePath = getFilePath('../../file/template.txt')

// 导出
export const handleTemplate = () => {
  try {
    inquirer
      .prompt(promptActions)
      .then((answers) => {
        if (answers.mode === 'add') {
          try {
            delete answers.mode
            templateList.push(answers)
            fs.writeFileSync(templatePath, JSON.stringify(templateList))
            console.log(symbols.success, chalk.green('添加成功'))
            process.exit()
          } catch {
            console.log(symbols.error, chalk.red('添加失败'))
            process.exit()
          }
        } else if (answers.mode === 'upload') {
          try {
            const data = fs.readFileSync(answers.filePath.trim(), 'utf-8')
            fs.writeFileSync(templatePath, JSON.stringify([...templateList, ...JSON.parse(data)]))
            console.log(symbols.success, chalk.green('上传成功'))
            process.exit()
          } catch {
            console.log(symbols.error, chalk.red('上传失败'))
            process.exit()
          }
        } else {
          if (templateList.length <= 0) {
            console.log(symbols.warning, chalk.yellow('您还没有添加数据，请先添加再操作！'))
            process.exit()
          }
          if (answers.mode === 'delete') {
            try {
              templateList.splice(Number(answers.index), 1)
              fs.writeFileSync(templatePath, JSON.stringify(templateList))
              console.log(symbols.success, chalk.green('删除成功'))
              process.exit()
            } catch {
              console.log(symbols.error, chalk.red('删除失败'))
              process.exit()
            }
          } else if (answers.mode === 'edit') {
            try {
              delete answers.mode
              templateList[Number(answers.index)] = answers
              fs.writeFileSync(templatePath, JSON.stringify(templateList))
              console.log(symbols.success, chalk.green('编辑成功'))
              process.exit()
            } catch {
              console.log(symbols.error, chalk.red('编辑失败'))
              process.exit()
            }
          } else if (answers.mode === 'view') {
            console.table(templateList, Object.keys(templateList[0]))
          } else if (answers.mode === 'download') {
            try {
              shell.cp(templatePath, getHomeDir())
              console.log(symbols.success, chalk.green('下载成功'))
              process.exit()
            } catch {
              console.log(symbols.error, chalk.red('下载失败'))
              process.exit()
            }
          }
        }
      })
      .catch((error) => {
        console.log(symbols.error, chalk.red(`error：${error}`))
        process.exit()
      })
  } catch {
    process.exit()
  }
}
