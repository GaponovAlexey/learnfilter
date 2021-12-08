import React, { useEffect, useMemo, useState } from 'react'

function App() {
  const [data, setData] = useState([
    { id: 1, title: 'Java', body: 'history' },
    { id: 2, title: 'Javascript', body: 'favorite' },
    { id: 3, title: 'Go', body: 'feature' },
    { id: 4, title: 'Rast', body: 'good' },
    { id: 5, title: 'C++', body: 'legacy' },
    { id: 6, title: 'C#', body: 'game' },
    { id: 7, title: 'Kotlin', body: 'android' },
    { id: 8, title: 'Ryby', body: 'functional' },
    { id: 8, title: 'Python', body: 'good' },
    { id: 8, title: 'basic', body: 'legacy' },
  ])

  const [opti, setOnpion] = useState([
    { value: 'title', name: 'по названию' },
    { value: 'body', name: 'по тексту' },
  ])

  const [select, setSelect] = useState('')
  const [query, setQuery] = useState('')

  const selectChoice = useMemo(() => {
    if (select) {
      return [...data].sort((a, b) => a[select].localeComplare(b[select]))
    }
    return data
  }, [data, select])

  const queryChoice = useMemo(() => {
    return selectChoice.filter((el) => el.title.toLowerCase().includes(query))
  }, [query, selectChoice])

  return (
    <div>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='search'
        />
        <hr />
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option disabled>выбор</option>
          {opti.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      {data.length ? (
        queryChoice.map((el) => (
          <h2>
            {el.title} - {el.body}
          </h2>
        ))
      ) : (
        <h1>Ничего нет</h1>
      )}
    </div>
  )
}

export default App
