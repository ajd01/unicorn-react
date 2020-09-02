import React from 'react'
import {
  keyDown,
  keyUp,
  moveObstacles,
  gameOverAction,
  checkColitions
} from './storeUtils'

export const Context = React.createContext()

export const InitialState = {
  globalScore: 0,
  score: 0,
  deads: 0,
  gameActive: false,
  objects: [],
  player: {
    imageSrc: '/unicorn/assets/uniStep1.png',
    action: 'walk',
    position: 10
  },
  frames: 10,
  obstacles: [],
  dificulty: 5,
  framesActives: 0,
  message: 'Press Bar to start'
}

export const Reducer = (state, action) => {
  switch (action.type) {
    case 'setActive':
      return { ...state, active: !state.active }
    case 'updateScore':
      return { ...state, score: state.score + 1 }
    case 'updatePlayerImage':
      state.player.imageSrc = action.imageSrc
      return { ...state }
    case 'updatePlayerAction':
      state.player.action = action.imageAction
      return { ...state }
    case 'keyDown':
      return keyDown(state, action)
    case 'keyUp':
      return keyUp(state, action)
    case 'moveObstacles':
      return moveObstacles(state, action)
    case 'newObstacle':
      state.obstacles = [
        ...state.obstacles,
        action.obstacle
      ]
      return { ...state }
    case 'checkColitions':
      return checkColitions(state, action)
    default:
      return { ...state }
  }
}
