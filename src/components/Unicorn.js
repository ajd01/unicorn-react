import React, { useContext } from 'react'
import { Context } from '../store'

const Unicorn = () => {
  const { store, dispatch } = useContext(Context)

  return (
    <img
      style={{
        left: store.player.position + '%',
        top: '30%',
        position: 'absolute'
      }}
      alt='uncorn'
      src={store.player.imageSrc}
    />
  )
}

export default Unicorn
