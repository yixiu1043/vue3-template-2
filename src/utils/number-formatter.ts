class Formatter extends Intl.NumberFormat {
  private fixeder!: Formatter
  constructor(options: Intl.NumberFormatOptions = {}) {
    super('en-PH', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      ...options
    })
  }

  format(value: number | bigint | string, fixed?: boolean): string {
    value = this.digitalize(value)
    if (fixed) {
      this.fixeder ||= this.createFixeder()
      return this.fixeder.format(value)
    }
    return super.format(value)
  }

  private digitalize(n: unknown): number | bigint {
    if (isNaN(n as any)) {
      console.error(`[Formatter.digitalize] convert failed by "${n}"`)
      return 0
    }
    return Number(n)
  }

  private createFixeder() {
    const o = this.resolvedOptions()
    return new Formatter({
      ...o,
      minimumFractionDigits: o.maximumFractionDigits
    })
  }
}

const _monetise = new Formatter({
  style: 'currency',
  currency: 'PHP'
})

const _amountize = new Formatter()

/** 数字货币化，有货币符号 */
export function monetise(n: number | string | bigint, fixed = false) {
  return _monetise.format(n, fixed)
}

/** 数字金额化，没有货币符号 */
export function amountize(n: number | string | bigint, fixed = false) {
  return _amountize.format(n, fixed)
}
