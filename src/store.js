import React from 'react'

export const Context = React.createContext()

export const InitialState = {
  score: 0,
  deads: 0,
  gameActive: false,
  objects: [],
  player: {
    imageSrc: '/assets/uniStep1.png',
    action: 'walk',
    position: 10
  },
  frames: 10,
  obstacles: [],
  dificulty: 5,
  framesActives: 0
}

const keyDown = (state, action) => {
  if (action.keyCode === 38) {
    state.player.action = 'jump'
  }
  if (action.keyCode === 40) {
    state.player.action = 'getDown'
  }
  console.log(action.keyCode)
  return { ...state }
}

const keyUp = (state, action) => {
  if (action.keyCode === 38) {
    state.player.action = 'walk'
    console.log(state.obstacles)
  }
  if (action.keyCode === 40) {
    state.player.action = 'walk'
  }
  return { ...state }
}

const moveObstacles = (state, acion) => {
  state.obstacles = state.obstacles.map(obs => {
    const newPosition = obs.position - 10 / state.dificulty
    if (newPosition > -100) {
      return { ...obs, position: newPosition }
    } return undefined
  }).filter(a => a)
  return { ...state }
}

const checkColitions = (state, action) => {
  const a = state.obstacles.map(o => {
    const position = o.position
    if (position - state.player.position <= 10) {
      console.log('colision')
    }
    return position
  })
  console.log(a)

  return { ...state }
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
