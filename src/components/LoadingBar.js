import React from 'react'

export const LoadingBar = ({loadingValue}) => {
  return (
    loadingValue < 100 ? <progress className="nes-progress is-primary" value={loadingValue} max="100"></progress>
    : <p>This app has been TPKed...sorry</p>
  )
}

