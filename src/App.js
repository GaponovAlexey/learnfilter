import React, { useEffect, useMemo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ApiResponse from './API/fetchin'

function App() {
  const [data, setData] = useState([])
  const [options, setOptions] = useState([
    { value: 'title', name: 'по заголовку' },
    { value: 'body', name: 'по телу' },
  ])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [filter, setFILTER] = useState({
    select: '',
    query: '',
  })

  const [allPage, setALLPAGE] = useState({
    fullPage: 0,
    page: 1,
    limit: 3,
  })

  const getArrayPages = () => {
    let result = []
    for(let i = 1; i < allPage.fullPage; i++){
      result.push(i)
    }
    return result
  }
  const ArrayPages = getArrayPages()


  const fetching = async () => {
    const response = await ApiResponse.getAll(allPage.page, allPage.limit)
    setData(response.data)
    const fullPage = response.headers['x-total-count']
    setALLPAGE({ ...allPage, fullPage: Math.ceil(fullPage / allPage.limit) })
  }
  useEffect(() => {
    fetching()
  }, [allPage.page])

  const selectSearch = useMemo(() => {
    if (filter.select) {
      return [...data].sort((a, b) =>
        a[filter.select].localeCompare(b[filter.select])
      )
    }
    return data
  }, [filter.select, data])
  const querySearch = useMemo(() => {
    return selectSearch.filter((el) =>
      el.title.toLowerCase().includes(filter.query)
    )
  }, [filter.query, selectSearch])

  const addData = () => {
    const newData = {
      id: Date.now(),
      title,
      body,
    }
    setData([newData, ...data])
  }
  
console.log('render');
  const removeItem = (id) => {
    setData(data.filter((el) => el.id !== id))
  }
  return (
    <div>
      <input
        value={filter.query}
        onChange={(e) => setFILTER({ ...filter, query: e.target.value })}
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
      <select
        value={filter.select}
        onChange={(el) => setFILTER({ ...filter, select: el.target.value })}
      >
        <option disabled>поиск</option>
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.name}
          </option>
        ))}
      </select>
      {data.length ? (
        <TransitionGroup>
          {querySearch.map((el) => (
            <CSSTransition key={el.id} timeout={200} classNames='item'>
              <h2>
                {el.id}.{el.title} - {el.body}
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
      {allPage ? <div className='pagin__wraper' >
        {ArrayPages.map(p => <spam
        key={p}
        className={allPage.page === p ? 'pagin pagin__curent' : 'pagin'}
        onClick={() => setALLPAGE({...allPage, page: p}) }
        >{p}</spam>)}
      </div> : <span>no page</span>}
    </div>
  )
}

export default App
