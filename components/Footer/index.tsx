import React from 'react'
import { CenteredColumn } from '../Layouts'

export default function Footer() {
  return (
    <CenteredColumn>
      <div className="h-px bg-gray-200 dark:bg-gray-800 timeline-stroke" />
      <div className="grid grid-cols-1 gap-4 p-6 py-8 bg-gray-100 sm:grid-cols-3 dark:bg-gray-900 sm:bg-gray-50 sm:dark:bg-gray-1000">
        <div className="flex flex-col space-y-4">
          <a href="https://www.flaticon.com/authors/freepik">Icons made by Freepik</a>
        </div>
        <div className="flex flex-col space-y-4">
          <a
            href="https://twitter.com/mlohc137"
            target="_blank"
            rel="noopener noreferrer"
            className="black-link"
          >
            @mlohc137
          </a>
        </div>
      </div>
    </CenteredColumn>   
  )
}