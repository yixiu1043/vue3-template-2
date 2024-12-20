import member from './local.txt?raw'
function parse() {
  const rows = member.split(/\r\n/)
  const data: { lotteryNumber: string; loginName: string }[] = []
  for (let i = 0; i < rows.length; i++) {
    const [number, username] = rows[i].split('|')

    data.push({ lotteryNumber: number, loginName: username })
  }

  return data
}

export default parse()
