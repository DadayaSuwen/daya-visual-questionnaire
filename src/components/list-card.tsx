import React, { useState } from 'react'
import './list-card.scss'

export default function ListCard() {
  const [data] = useState([
    {
      id: 1,
      title: 'name1',
      isPublish: true
    }
  ])
  return (
    <div>
      <span>列表</span>
      <ul>
        {data.map(item => {
          return <li>{item.title}</li>
        })}
      </ul>
    </div>
  )
}
