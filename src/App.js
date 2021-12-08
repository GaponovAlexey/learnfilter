import React, { useState } from 'react'

function App() {
  const [data, setData] = useState([
    { id: 1, title: 'java', body: 'history' },
    { id: 2, title: 'javascript', body: 'favorite' },
    { id: 3, title: 'Go', body: 'feature' },
    { id: 4, title: 'Rast', body: 'good' },
    { id: 5, title: 'C++', body: 'legacy' },
    { id: 6, title: 'C#', body: 'game' },
    { id: 7, title: 'Kotlin', body: 'android' },
    { id: 8, title: 'Ryby', body: 'functional' },
    { id: 8, title: 'Python', body: 'good' },
    { id: 8, title: 'basic', body: 'legacy' },
  ])

  return (
    <div>
      <div>
        <input placeholder="search"  />
      </div>
      <div>
        {data.map((el) => (
          <h1>
            {el.title} - {el.body}
          </h1>
        ))}
      </div>
    </div>
  )
}

export default App
