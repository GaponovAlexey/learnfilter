import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './page/Main'
import { PageInfo } from './page/PageInfo'

function App() {
  return(
    <Routes>
      <Route path='/' element={<Main />}  />
      <Route path='/:id' element={<PageInfo />}  />
    </Routes>
    
  )
}

export default App
