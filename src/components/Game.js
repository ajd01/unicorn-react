import React, { useContext } from 'react'
import { Context } from '../store'
import Unicorn from './Unicorn'
import Obstacles from './Obstacles'

const Game = () => {
  const { store, dispatch } = useContext(Context)
  let frames = 0
  const requestRef = React.useRef()

  const animate = time => {
    if (store.gameActive) {
      if (frames % store.frames === 0) {
      // Player Actions
        if (store.player.action === 'walk') {
          const newImage = store.player.imageSrc === '/unicorn/assets/uniStep1.png'
            ? '/unicorn/assets/uniStep2.png'
            : '/unicorn/assets/uniStep1.png'
          dispatch({ type: 'updatePlayerImage', imageSrc: newImage })
        }
        if (store.player.action === 'jump') {
          dispatch({ type: 'updatePlayerImage', imageSrc: '/unicorn/assets/uniJump.png' })
        }
        if (store.player.action === 'getDown') {
          dispatch({ type: 'updatePlayerImage', imageSrc: '/unicorn/assets/uniDown.png' })
        }
        // Obstacles Actions
        dispatch({ type: 'moveObstacles' })
        if (frames % parseInt(Math.random() * 200) === 0) {
          dispatch({
            type: 'newObstacle',
            obstacle: {
              type: parseInt(Math.random() * 11) % 2 === 0 ? 'hay' : 'frame',
              position: 100,
              counted: false
            }
          })
        }
        // Colisions
        dispatch({ type: 'checkColitions' })
      }
    }
    frames = frames + 1
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [store.gameActive])

  return (
    <div>
      {store.message !== '' &&
        <h1 className='message'>{store.message}</h1>}
      <Unicorn />
      <Obstacles />
    </div>
  )
}

export default Game
