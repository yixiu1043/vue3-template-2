export class StringBuffer {
  private buffer: string[]

  constructor() {
    this.buffer = []
  }

  // 添加单个字符串
  write(str: string): void {
    this.buffer.push(str)
  }

  // 添加多个字符串
  writeAll(strings: string[], separator: string = ''): void {
    this.buffer.push(strings.join(separator))
  }

  // 添加字符代码
  writeCharCode(code: number): void {
    this.buffer.push(String.fromCharCode(code))
  }

  // 返回最终的字符串
  toString(): string {
    return this.buffer.join('')
  }

  // 清空内容
  clear(): void {
    this.buffer = []
  }
}
