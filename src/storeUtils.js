const keyDown = (state, action) => {
    if (action.keyCode === 38) {
        state.player.action = 'jump'
    }
    if (action.keyCode === 40) {
        state.player.action = 'getDown'
    }
    // star Game
    if (action.keyCode === 32) {
        if (state.message !== 'GAME OVER Press R') {
        state.message = ''
        state.gameActive = true
        }
    }
    // Pause or Lose
    if (action.keyCode === 80) {
        state.message = 'PAUSE'
        state.gameActive = false
    }
    // Restart game
    if (action.keyCode === 82) {
        state = {
        ...state,
        score: 0,
        gameActive: true,
        objects: [],
        obstacles: [],
        message: ''
        }
    }
    console.log('gameActive....', state.gameActive)
    console.log(action.keyCode)
    return { ...state }
}
  
const keyUp = (state, action) => {
    if (action.keyCode === 38) {
        state.player.action = 'walk'
    }
    if (action.keyCode === 40) {
        state.player.action = 'walk'
    }
    return { ...state }
}
  
  const moveObstacles = (state, acion) => {
    state.obstacles = state.obstacles.map((obs, i) => {
      const newPosition = obs.position - 10 / state.dificulty
      if (newPosition > -100) {
        if (obs.position - state.player.position <= -5 && !obs.counted) {
          state.score += 1
          obs.counted = true
        }
        return { ...obs, position: newPosition }
      } else {
        return undefined
      }
    }).filter(a => a)
    return { ...state }
  }
  
  const gameOverAction = (state) => {
    if (state.message !== 'GAME OVER Press R') {
      state.message = 'GAME OVER Press R'
      state.globalScore = state.score > state.globalScore ? state.score : state.globalScore
      state.score = 0
      state.deads += 1
    }
    return state
  }
  
  const checkColitions = (state, action) => {
    const newState = state
    state.obstacles.map(o => {
      const position = o.position
      if (position - state.player.position <= 5 &&
        position - state.player.position >= -5) {
        if (state.player.action === 'walk' ||
          state.player.action === 'getDown') {
          newState.gameActive = false
        }
      }
      return position
    })
    if (!newState.gameActive) {
      gameOverAction(newState)
    }
    return { ...newState }
  }

module.exports = {
    keyDown,
    keyUp,
    moveObstacles,
    gameOverAction,
    checkColitions
}
