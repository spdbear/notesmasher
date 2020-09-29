import { settingType } from './type'
import * as rule from './rule'

export const createKeyArray = (setting: settingType) => {
  switch (setting.LANE_NUM) {
    case 1:
      return [' ']
    case 2:
      return ['f', 'j']
    case 3:
      return ['f', ' ', 'j']
    case 4:
      return ['d', 'f', 'j', 'k']
    case 5:
      return ['d', 'f', ' ', 'j', 'k']
    case 6:
      return ['s', 'd', 'f', 'j', 'k', 'l']
    case 7:
      return ['s', 'd', 'f', ' ', 'j', 'k', 'l']
    case 8:
      return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
    case 9:
      return ['a', 's', 'd', 'f', ' ', 'j', 'k', 'l', ';']
  }
}

export const createNotes = (setting: settingType) => {
  const notesArray: boolean[][] = []
  const selectedLane: number[] = []
  const getDisallowRule = () => {
    switch (setting.NOTE_ALLOW_RENDA) {
      case '8BIT_1':
        return rule.has8bit2
      case '8BIT_2':
        return rule.has8bit3
      case '8BIT_3':
        return rule.has8bit4
      case '16BIT_1':
        return rule.has16bit2
      case '16BIT_2':
        return rule.has16bit3
      case '16BIT_3':
        return rule.has16bit4
      default:
        return rule.has8bit4
    }
  }

  for (let i = 0; i < setting.NOTE_NUM; i++) {
    let hasNoteLine = Math.floor(Math.random() * setting.LANE_NUM)
    while (
      getDisallowRule()(
        hasNoteLine,
        selectedLane,
        setting.LANE_NUM,
        setting.NOTE_ALTERNATE
      ) ||
      (setting.NOTE_ALTERNATE &&
        rule.isNotAlternate(hasNoteLine, selectedLane, setting.LANE_NUM))
    ) {
      hasNoteLine = Math.floor(Math.random() * setting.LANE_NUM)
    }
    let notes: boolean[] = Array(setting.LANE_NUM).fill(false)
    notes[hasNoteLine] = true
    notesArray.push(notes)
    selectedLane.push(hasNoteLine)
  }
  return notesArray
}
