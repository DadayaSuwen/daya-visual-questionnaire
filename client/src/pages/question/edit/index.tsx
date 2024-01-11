import React from 'react'
import useLoadQuestion from '../../../hooks/use-load-question'
const Edit = () => {
  const { loading, data } = useLoadQuestion()
  return <div>{loading ? <span>loading</span> : JSON.stringify(data)}</div>
}
export default Edit
