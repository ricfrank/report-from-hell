import React from 'react'
import electron from 'electron'

export const ExternalLink = ({ children, href, ...otherProps }) => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        electron.shell.openExternal(href)
      }}
      {...otherProps}
    >
      {children}
    </a>
  )
}
