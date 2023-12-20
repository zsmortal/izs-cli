#! /usr/bin/env node
import { program } from 'commander' // 命令行工具
import { version, description, handleVersion } from '../lib/version/index.js'
import { handleTemplate } from '../lib/template/index.js'
import { createProject } from '../lib/create/index.js'

// 配置使用方法
program.usage('<command> [options]')

// 查看版本号
program.version(version, '-v, --version', 'view version number').description(description)

// 查看版本号
program
  .command('version [command]')
  .alias('v')
  .description('view version number')
  .action(() => handleVersion())

// 模版相关操作
program
  .command('template [command]')
  .alias('t')
  .description('template related operations')
  .action(() => handleTemplate())

// 创建项目
program
  .command('create <projectName>')
  .alias('c')
  .description('创建项目')
  .action((appName) => createProject(appName))

// 解析命令行参数
program.parse(process.argv)
