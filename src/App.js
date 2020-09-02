import React, { useReducer } from 'react'
import Game from './components/Game'
import './App.css'
import { Reducer, InitialState, Context } from './store'

function App () {
  const [store, dispatch] = useReducer(Reducer, InitialState)

  return (
    <Context.Provider value={{ store, dispatch }}>
      <div
        className='App'
        tabIndex='0'
        onKeyDown={(e) => dispatch({ type: 'keyDown', keyCode: e.keyCode })}
        onKeyUp={(e) => dispatch({ type: 'keyUp', keyCode: e.keyCode })}
      >
        <header className='App-header'>
          <div>Score: {store.score} MAX: {store.globalScore}</div>
          <div>Run Unicorn!</div>
          <div>Deads: {store.deads}</div>
        </header>
        <game>
          <Game />
        </game>
        <footer>
          <div>UnoTalks</div>
          <div>Audelio Lujan</div>
          <div>JS Guild</div>
        </footer>
      </div>
    </Context.Provider>
  )
}

export default App
