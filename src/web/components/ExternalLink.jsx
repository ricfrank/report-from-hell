import React from 'react'

export const ExternalLink = ({ children, href, ...otherProps }) => {
  return (
    <a
      href={href}
      onClick={e => {
        if (IS_DESKTOP) {
          e.preventDefault()
          require('electron').shell.openExternal(href)
        }
      }}
      {...otherProps}
    >
      {children}
    </a>
  )
}
