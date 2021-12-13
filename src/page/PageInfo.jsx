import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ApiResponse from '../API/fetchin'

export const PageInfo = () => {
  const [data, setDATA] = useState([])
  const [coments, setCOMENTS] = useState([])

  const params = useParams()
  console.log(data)

  const Dataset = async () => {
    const response = await ApiResponse.getPost(params.id)
    setDATA(response.data)
    return Dataset
  }
  const Comment = async () => {
    const response = await ApiResponse.getComents(params.id)
    setCOMENTS(response.data)
    return Comment
  }
  console.log(coments)
  useEffect(() => {
    Dataset()
    Comment()
  }, [])
  return (
    <div>
      <div style={{ color: 'blue' }}>params: {data.body}</div>
      <div>
        {coments.map((el) => (
          <div key={el.id} style={{ marginBottom: 15 }}>
            <div>{el.email}</div>
            <div>{el.body}</div>
          </div>
        ))}
      </div>{' '}
    </div>
  )
}
