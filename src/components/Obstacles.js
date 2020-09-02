import React, { useContext } from 'react'
import { Context } from '../store'

const Obstacle = ({ type = 'hay', position }) => {
  return (
    <img
      style={{
        left: position + '%',
        top: '40%',
        position: 'absolute'
      }}
      alt='Obstacle'
      src={type !== 'hay'
        ? '/unicorn/assets/fence.png'
        : '/unicorn/assets/hay.png'}
    />
  )
}

const Obstacles = () => {
  const { store, dispatch } = useContext(Context)

  return store.obstacles.length > 0
    ? store.obstacles.map((obs, i) =>
      <Obstacle
        key={i}
        type={obs.type}
        position={obs.position}
      />
    )
    : <></>
}

export default Obstacles
