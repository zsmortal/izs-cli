import chalk from 'chalk' // 美化终端字符
import figlet from 'figlet' // 提供一些文字效果
import { getFileContent } from '../../utils/tool.js'
const packageContent = getFileContent('../../package.json')

// 导出
export const version = `version：${chalk.green(packageContent.version)}`
export const description = packageContent.description
export const handleVersion = () => {
  console.log(figlet.textSync(`${packageContent.name.replace('-', '')}   ${packageContent.version}`))
}
