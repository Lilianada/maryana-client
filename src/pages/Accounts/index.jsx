import React from 'react'
import Overview from './Overview'
import Tabs from './Tabs'

export default function AccountsOverview() {
  return (
    <div className='grid gap-12'>
      <Overview />
      <Tabs/>
    </div>
  )
}
