import dayjs from 'dayjs'
import { createKeyArray, createNotes } from './init'
import { stateType, settingType, LaneNumType, AllowRendaType } from './type'
import * as util from './util'

const canvas: HTMLCanvasElement = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const CANVAS_W = 768
const CANVAS_H = 432
canvas.width = CANVAS_W
canvas.height = CANVAS_H
const LANE_W = 420
const NOTE_H = 52
const NOTE_PADDING_X = 10

const setting: settingType = {
  LANE_NUM: 4,
  NOTE_NUM: 128,
  NOTE_ALLOW_RENDA: '8BIT_3',
  NOTE_ALTERNATE: false,
  MISS_COOLTIME: 100,
}

const state: stateType = {
  timer: 0,
  miss: 0,
  coolTimeCounter: 0,
  gameState: 'BEFORE_START',
  effectsArray: [],
  notesHeightDiff: 0,
}

const gameObject = {
  keyArray: createKeyArray(setting),
  notesArray: createNotes(setting),
}

const initialize = () => {
  state.timer = 0
  state.miss = 0
  state.coolTimeCounter = 0
  state.gameState = 'BEFORE_START'
  gameObject.keyArray = createKeyArray(setting)
  gameObject.notesArray = createNotes(setting)
  clearEffect()
}

const changeKeys = (keys: LaneNumType) => {
  setting.LANE_NUM = keys
  initialize()
}
const changeAlternate = () => {
  setting.NOTE_ALTERNATE = !setting.NOTE_ALTERNATE
  initialize()
}
const changeNotesLength = (n: 1 | -1) => {
  setting.NOTE_NUM = setting.NOTE_NUM + n || 1
  initialize()
}
const changeDifficulty = (n: 1 | -1) => {
  const difficultyRank = {
    '8BIT_1': 0,
    '8BIT_2': 1,
    '8BIT_3': 2,
    '16BIT_1': 3,
    '16BIT_2': 4,
    '16BIT_3': 5,
  }
  const newDif = (difficultyRank[setting.NOTE_ALLOW_RENDA] + n) % 6
  // TODO: as使わないようにする
  const newRule =
    Object.keys(difficultyRank).filter((key) => {
      return difficultyRank[key] === newDif
    })[0] || '16BIT_3'
  setting.NOTE_ALLOW_RENDA = newRule as AllowRendaType

  initialize()
}

const clearEffect = () => {
  state.effectsArray = []
}

const draw = () => {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  drawNotes()
  drawScore()
  drawEffect()
  drawConstant()
  if (
    gameObject.notesArray.length > 0 &&
    gameObject.notesArray.length < setting.NOTE_NUM
  ) {
    state.gameState = 'STARTED'
  }
  if (gameObject.notesArray.length === 0) {
    state.gameState = 'ENDED'
    clearEffect()
  }
  if (state.gameState === 'STARTED') {
    state.timer++
    state.coolTimeCounter--
  }
  state.notesHeightDiff -= 20
  if (state.notesHeightDiff < 0) {
    state.notesHeightDiff = 0
  }

  requestAnimationFrame(draw)
}

const drawNotes = () => {
  const noteWidth = LANE_W / setting.LANE_NUM
  const notePosition = gameObject.notesArray.map((arr, i) => {
    const index = arr.findIndex((e: boolean) => e === true)
    return { x: index * noteWidth, y: i * NOTE_H }
  })
  for (let i = 0; i < gameObject.notesArray.length; i++) {
    const xAdjust = CANVAS_W / 2 - (setting.LANE_NUM * noteWidth) / 2
    const yAdjust = -(notePosition.length * NOTE_H) + CANVAS_H
    ctx.beginPath()
    ctx.rect(
      notePosition[i].x + xAdjust + NOTE_PADDING_X / 2,
      notePosition[i].y + yAdjust - state.notesHeightDiff,
      noteWidth - NOTE_PADDING_X,
      NOTE_H / 2
    )
    ctx.fillStyle = '#444'
    ctx.fill()
    ctx.closePath()
  }
}

const drawScore = () => {
  ctx.fillStyle = '#666'
  ctx.font = 'bold 22px sans-serif'
  ctx.textAlign = 'start'
  const len = gameObject.notesArray.length
  const time = util.roundNum(state.timer / 60, 2)
  const speed = util.roundNum((setting.NOTE_NUM - len) / time, 1)
  const bpm = util.roundNum(speed * 15, 0)
  ctx.fillText(`N: ${len}/${setting.NOTE_NUM}`, 10, 50)
  if (state.gameState === 'ENDED') {
    ctx.fillText(`TIME: ${time}`, 10, 100)
    ctx.fillText(`MISS: ${state.miss}`, 10, 150)
    ctx.fillText(`SPEED: ${speed}`, 10, 200)
    ctx.fillText(`BPM: ${bpm}`, 10, 250)
  }
}

const drawEffect = () => {
  state.effectsArray.forEach((e) => {
    const t = util.myEase(state.timer - e.time)
    const w = e.size.w
    const h = e.size.h
    ctx.beginPath()
    ctx.rect(
      e.pos.x - w / 2 + e.size.w / 2,
      e.pos.y - h / 2 + e.size.h / 2,
      w,
      h
    )
    ctx.fillStyle = `rgba(${e.rgba[0]}, ${e.rgba[1]}, ${e.rgba[2]}, ${
      e.rgba[3] - t / 20
    })`
    ctx.fill()
    ctx.closePath()
  })
}

const drawConstant = () => {
  const noteWidth = LANE_W / setting.LANE_NUM
  ctx.font = 'bold 22px sans-serif'
  ctx.fillStyle = '#888'
  ctx.textAlign = 'center'
  const xAdjust = CANVAS_W / 2 - LANE_W / 2
  for (let i = 0; i < setting.LANE_NUM; i++) {
    if (gameObject.keyArray[i] === ' ') {
      ctx.fillText(
        setting.LANE_NUM >= 7 ? '_' : 'SPACE',
        i * noteWidth + xAdjust + noteWidth / 2,
        CANVAS_H - 31
      )
    } else {
      ctx.fillText(
        `${gameObject.keyArray[i].toUpperCase()}`,
        i * noteWidth + xAdjust + noteWidth / 2,
        CANVAS_H - 31
      )
    }
    ctx.beginPath()
    ctx.rect(xAdjust - 4, 0, 4, CANVAS_H)
    ctx.rect(xAdjust + LANE_W, 0, 4, CANVAS_H)
    ctx.fill()
    ctx.closePath()
  }
  ctx.font = 'bold 22px sans-serif'
  ctx.fillStyle = '#666'
  ctx.textAlign = 'right'
  ctx.fillText('Esc : Retry', CANVAS_W - 10, 50)
  if (state.gameState === 'BEFORE_START' || state.gameState === 'ENDED') {
    ctx.fillText(`LaneNum : ${setting.LANE_NUM}`, CANVAS_W - 10, 100)
    ctx.fillText(
      `L-R Alt: ${setting.NOTE_ALTERNATE ? 'ON' : 'OFF'}`,
      CANVAS_W - 10,
      150
    )
    ctx.fillText(`< ${setting.NOTE_ALLOW_RENDA} >`, CANVAS_W - 10, 200)
  }
}

const hitNotes = (idx: number) => {
  const noteWidth = LANE_W / setting.LANE_NUM
  const currentNote = gameObject.notesArray[gameObject.notesArray.length - 1]
  const currentTime = state.timer
  if (currentNote) {
    const xPos =
      idx * noteWidth +
      CANVAS_W / 2 -
      (setting.LANE_NUM * noteWidth) / 2 +
      NOTE_PADDING_X / 2
    // ミスした後のクールタイム中ならノーツ判定をしない
    if (state.coolTimeCounter > 0) {
      return
    }
    if (currentNote[idx] === true) {
      gameObject.notesArray.pop()
      state.effectsArray.push({
        pos: { x: xPos, y: CANVAS_H - NOTE_H },
        size: {
          w: noteWidth - NOTE_PADDING_X,
          h: NOTE_H / 2,
        },
        time: currentTime,
        rgba: [108, 190, 221, 1],
        type: 'HIT',
      })
      state.notesHeightDiff = NOTE_H
    } else {
      if (state.gameState == 'STARTED') {
        state.coolTimeCounter = (setting.MISS_COOLTIME / 1000) * 60
        state.miss++
        state.effectsArray.push({
          pos: { x: xPos, y: CANVAS_H - NOTE_H },
          size: {
            w: noteWidth - NOTE_PADDING_X,
            h: NOTE_H / 2,
          },
          time: currentTime,
          rgba: [223, 90, 78, 1],
          type: 'MISS',
        })
      }
    }
  }
}

const downloadScreenshot = () => {
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = `ScreenShot-${dayjs().format('YYMMDD-HHmmss')}.png`
  link.click()
}
document
  .querySelector('.capture')
  .addEventListener('click', downloadScreenshot, false)

const keyDownHandler = (e: KeyboardEvent) => {
  if (gameObject.keyArray.includes(e.key)) {
    e.preventDefault()
    const idx = gameObject.keyArray.indexOf(e.key)
    hitNotes(idx)
  }
  const isLaneNum = (n: any): n is LaneNumType => 1 <= n && n <= 9
  const numKey = parseInt(e.key)
  if (isLaneNum(numKey) && state.gameState === 'BEFORE_START') {
    changeKeys(numKey)
  }
  if (e.key === 'Escape' || e.key === 'Esc') {
    initialize()
  }
  if (e.key === 'Alt' && state.gameState === 'BEFORE_START') {
    changeAlternate()
  }
  if (e.key === '<' && state.gameState === 'BEFORE_START') {
    changeDifficulty(-1)
  }
  if (e.key === '>' && state.gameState === 'BEFORE_START') {
    changeDifficulty(1)
  }
  if (e.key === '+' && state.gameState === 'BEFORE_START') {
    changeNotesLength(1)
  }
  if (e.key === '-' && state.gameState === 'BEFORE_START') {
    changeNotesLength(-1)
  }
}
document.addEventListener('keydown', keyDownHandler, false)

requestAnimationFrame(draw)
