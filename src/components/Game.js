import React, { useContext, useState } from 'react'
import { Context } from '../store'
import Unicorn from './Unicorn'
import Obstacles from './Obstacles'

const Game = () => {
  const { store, dispatch } = useContext(Context)
  let frames = 0
  const requestRef = React.useRef()

  const animate = time => {
    if (frames % store.frames === 0) {
      // Player Actions
      if (store.player.action === 'walk') {
        const newImage = store.player.imageSrc === '/assets/uniStep1.png'
          ? '/assets/uniStep2.png'
          : '/assets/uniStep1.png'
        dispatch({ type: 'updatePlayerImage', imageSrc: newImage })
      }
      if (store.player.action === 'jump') {
        dispatch({ type: 'updatePlayerImage', imageSrc: '/assets/uniJump.png' })
      }
      if (store.player.action === 'getDown') {
        dispatch({ type: 'updatePlayerImage', imageSrc: '/assets/uniDown.png' })
      }
      // Obstacles Actions
      dispatch({ type: 'moveObstacles' })
      if (frames % parseInt(Math.random() * 200) === 0) {
        dispatch({
          type: 'newObstacle',
          obstacle: {
            type: frames % 2 === 0 ? 'hay' : 'frame',
            position: 100
          }
        })
      }
      // Colisions
      dispatch({ type: 'checkColitions' })
    }
    frames = frames + 1
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <div>
      <Unicorn />
      <Obstacles />
    </div>
  )
}

export default Game
