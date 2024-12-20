import newWebWorker from '@/utils/inline-web-worker'

function countdown() {
  class Countdown {
    constructor(option, id) {
      Object.assign(this, option)
      this.time = {}
      this.days = 0
      this.hours = 0
      this.minutes = 0
      this.seconds = 0
      this.modified = false
      this.stopped = false
      this.id = id
      this.endTime = this.toTimestamp(option.endTime || new Date(Date.now() + option.duration))
    }

    toTimestamp(raw) {
      if (typeof raw === 'number') {
        return raw
      }
      if (raw instanceof Date) {
        return raw.getTime()
      }
      if (typeof raw === 'string') {
        return new Date(raw.replace(/[-\s]/g, '/')).getTime()
      } else {
        throw '[option.endTime] must be a number or string or Date type'
      }
    }

    format() {
      const diff = (this.endTime - Date.now()) / 1000
      this.modified = false
      if (diff <= 0) {
        this.stopped = true
        return
      }

      if (this.dayInHour) {
        this._format('hours', Math.floor(diff / 60 / 60))
      } else {
        this._format('days', Math.floor(diff / 60 / 60 / 24))
        this._format('hours', Math.floor(diff / 60 / 60) % 24)
      }

      this._format('minutes', Math.floor(diff / 60) % 60)
      this._format('seconds', Math.floor(diff) % 60)
    }

    _format(key,value) {
      const v = this.fixed(value)
      this.modified ||= this[key] !== v
      this[key] = v
    }

    fixed(n) {
      return n.toString().padStart(2, '0')
    }

    toObject() {
      return {
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
      }
    }

    toArray() {
      return [this.days, this.hours, this.minutes, this.seconds]
    }
  }

  let ref
  let last = 0
  let running = false
  const queue = new Map()

  const counting = () => {
    running = true
    ref = self.requestAnimationFrame(counting)
    const now = Date.now()
    if (now - last < 250) return
    last = now
    queue.forEach((item) => {
      if (!item.stopped) {
        item.format()
        if (item.modified) {
          self.postMessage({ type: 'response', id: item.id, data: item.toObject() })
        }
      }
    })
  }

  self.onmessage = (e) => {
    const { type, data, id } = e.data

    switch (type) {
      case 'push': {
        queue.set(id, new Countdown(data, id))
        if (!running) {
          counting()
        }
        break
      }
      case 'stop': {
        const item = queue.get(id)
        if (item) {
          item.stopped = true
        }
        break
      }
      case 'remove': {
        queue.delete(id)
        if (queue.size === 0) {
          self.cancelAnimationFrame(ref)
          running = false
        }
        break
      }
    }
  }
}

const countDownWorker = newWebWorker(countdown)

export default countDownWorker
