import fs from 'fs' // 内置文件操作模块
import os from 'os' // 内置操作系统模块
import path from 'path' // 内置路径操作模块
import url from 'url' // 内置解析地址模块

/**
 * 获取系统桌面绝对路径
 * @returns String
 */
export const getHomeDir = () => {
  return path.join(os.homedir(), 'Desktop')
}

/**
 * 获取文件绝对路径
 * @param {string} pathStr 文件相对路径
 * @returns String
 */
export const getFilePath = (pathStr) => {
  return path.join(url.fileURLToPath(import.meta.url), pathStr)
}

/**
 * 获取文件内容
 * @param {string} pathStr 文件相对路径
 * @returns String
 */
export const getFileContent = (pathStr) => {
  return JSON.parse(fs.readFileSync(getFilePath(pathStr), 'utf8'))
}

/**
 * 获取当前操作目录
 * @param {string} name 文件名称
 * @returns String
 */
export const getNowPath = (name) => {
  return `${process.cwd()}/${name}`
}

/**
 * 检查当前操作目录文件是否存在
 * @param {string} name 文件名称
 * @returns Boolean
 */
export const isFileExisted = (name) => {
  if (fs.existsSync(getNowPath(name))) return true
  return false
}
