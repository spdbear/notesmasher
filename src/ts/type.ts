type GameStateType = 'BEFORE_START' | 'STARTED' | 'ENDED'
export type LaneNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type AllowRendaType =
  | '8BIT_1'
  | '8BIT_2'
  | '8BIT_3'
  | '16BIT_1'
  | '16BIT_2'
  | '16BIT_3'

export type effectType = {
  pos: { x: number; y: number }
  size: { w: number; h: number }
  time: number
  rgba: [number, number, number, number]
  type: 'HIT' | 'MISS'
}

export type stateType = {
  timer: number
  miss: number
  coolTimeCounter: number
  gameState: GameStateType
  effectsArray: effectType[]
  notesHeightDiff: number
}

export type settingType = {
  LANE_NUM: LaneNumType
  NOTE_NUM: number
  NOTE_ALLOW_RENDA: AllowRendaType
  NOTE_ALTERNATE: boolean
  MISS_COOLTIME: number
}
