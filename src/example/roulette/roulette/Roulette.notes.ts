import * as THREE from 'three'
import Note from './Roulette.note'

export default class Notes extends THREE.Group {
  static count = 20
  static pool: Note[] = Array.from({ length: Notes.count }).map(() => new Note())

  constructor() {
    super()
    this.add(...Notes.pool)
    this.children
  }

  update() {
    for (let i = 0, len = Notes.pool.length; i < len; i++) {
      const note = this.children[i] as Note
      note.update()
    }
  }

  dispose() {
    Note.dispose()
  }
}
