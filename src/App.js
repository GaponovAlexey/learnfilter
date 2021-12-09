import React, { useEffect, useMemo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    { id: 9, title: 'Python', body: 'good' },
    { id: 10, title: 'basic', body: 'legacy' },
  ])
  const [options, setOptions] = useState([
    { value: 'title', name: 'по заголовку' },
    { value: 'body', name: 'по телу' },
  ])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [select, setSelect] = useState('')
  const [query, setQuery] = useState('')
  console.log('da')

  const selectSearch = useMemo(() => {
    if (select) {
      return [...data].sort((a, b) => a[select].localeCompare(b[select]))
    }
    return data
  }, [select, data])
  const querySearch = useMemo(() => {
    return selectSearch.filter((el) => el.title.toLowerCase().includes(query))
  }, [query, selectSearch])

  const addData = () => {
    const newData = {
      id: Date.now(),
      title,
      body,
    }
    setData([newData, ...data])
  }

  const removeItem = (id) => {
    setData(data.filter((el) => el.id !== id))
  }
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='search'
      />
      <hr />
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={addData}>send</button>
      <hr />
      <select value={select} onChange={(el) => setSelect(el.target.value)}>
        <option disabled>поиск</option>
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.name}
          </option>
        ))}
      </select>
      {data.length ? (
        <TransitionGroup>
          {querySearch.map((el, index) => (
            <CSSTransition key={el.id} timeout={200} classNames='item'>
              <h2 >
                {index + 1}.{el.title} - {el.body}
                <span
                  onClick={() => removeItem(el.id)}
                  style={{ color: 'red' }}
                >
                  {' '}
                  &#215;
                </span>
              </h2>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <h1>ничего нет</h1>
      )}
    </div>
  )
}

export default App
