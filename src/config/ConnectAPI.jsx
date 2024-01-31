import React from 'react'

const ConnectAPI = (url) => {
  return (
    fetch(url)
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  )
}

export default ConnectAPI