export interface Site {
  name: string
  url: string
  icon: string
  group: string
  // 只能外链打开 不能iframe嵌套 例如github
  external?: boolean
}