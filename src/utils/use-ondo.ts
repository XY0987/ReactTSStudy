import { useCallback, useState, useReducer } from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[]
  present: T
  future: T[]
}

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET }

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { type, newPresent } = action
  switch (type) {
    case UNDO: {
      if (past.length === 0) {
        return state
      }
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    }
    case REDO: {
      if (future.length === 0) {
        return state
      }
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }
    case SET: {
      if (newPresent == present) {
        return state
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }
  }
  return state
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>)

  //   const [past, setPast] = useState<T[]>([])
  //   const [present, setPresent] = useState(initialPresent)
  //   const [future, setFuture] = useState<T[]>([])
  const undo = useCallback(() => dispatch({ type: UNDO }), [])
  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent: newPresent })
  }, [])
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent: newPresent }),
    []
  )

  const redo = useCallback((newPresent: T) => dispatch({ type: REDO, newPresent: newPresent }), [])

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
