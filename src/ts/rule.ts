import { settingType } from './type'
export const isLeftHand = (l: number, n: number) => {
  return l * 2 + 1 <= n
}

export const isNotAlternate = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number
) => {
  if (laneNum < 2) return false
  if (
    isLeftHand(currentLane, laneNum) ===
    isLeftHand(selectedLane[selectedLane.length - 1], laneNum)
  ) {
    return true
  } else {
    return false
  }
}

export const has8bit2 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number,
  isAlternate: boolean
) => {
  if (laneNum < 3 || (laneNum === 3 && isAlternate)) {
    if (has16bit2(currentLane, selectedLane, laneNum)) return true
    return false
  }
  if (
    has16bit2(currentLane, selectedLane, laneNum) ||
    (selectedLane.length > 2 &&
      currentLane === selectedLane[selectedLane.length - 1]) ||
    currentLane === selectedLane[selectedLane.length - 2]
  ) {
    return true
  }
  return false
}

export const has8bit3 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number,
  isAlternate: boolean
) => {
  if (laneNum < 3 || (laneNum === 3 && isAlternate)) {
    if (has16bit2(currentLane, selectedLane, laneNum)) return true
    return false
  }
  if (
    has16bit2(currentLane, selectedLane, laneNum) ||
    (selectedLane.length > 4 &&
      currentLane === selectedLane[selectedLane.length - 1]) ||
    (currentLane === selectedLane[selectedLane.length - 2] &&
      currentLane === selectedLane[selectedLane.length - 4])
  ) {
    return true
  } else {
    return false
  }
}

export const has8bit4 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number,
  isAlternate: boolean
) => {
  if (laneNum < 3 || (laneNum === 3 && isAlternate)) {
    if (has16bit2(currentLane, selectedLane, laneNum)) return true
    return false
  }
  if (
    has16bit2(currentLane, selectedLane, laneNum) ||
    (selectedLane.length > 6 &&
      currentLane === selectedLane[selectedLane.length - 1]) ||
    (currentLane === selectedLane[selectedLane.length - 2] &&
      currentLane === selectedLane[selectedLane.length - 4] &&
      currentLane === selectedLane[selectedLane.length - 6])
  ) {
    return true
  } else {
    return false
  }
}
export const has16bit2 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number
) => {
  if (laneNum < 2) return false
  if (currentLane === selectedLane[selectedLane.length - 1]) {
    return true
  } else {
    return false
  }
}

export const has16bit3 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number
) => {
  if (laneNum < 2) return false
  if (
    selectedLane.length > 2 &&
    currentLane === selectedLane[selectedLane.length - 1] &&
    currentLane === selectedLane[selectedLane.length - 2]
  ) {
    return true
  } else {
    return false
  }
}

export const has16bit4 = (
  currentLane: number,
  selectedLane: number[],
  laneNum: number
) => {
  if (laneNum < 2) return false
  if (
    selectedLane.length > 3 &&
    currentLane === selectedLane[selectedLane.length - 1] &&
    currentLane === selectedLane[selectedLane.length - 2] &&
    currentLane === selectedLane[selectedLane.length - 3]
  ) {
    return true
  } else {
    return false
  }
}
