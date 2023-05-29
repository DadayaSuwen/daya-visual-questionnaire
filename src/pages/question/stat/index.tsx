import React from 'react'
import useLoadQuestion from '../../../hooks/useloadquestion'
const Stat = () => {
  const { loading, data } = useLoadQuestion()
  return <div>{loading ? <span>loading</span> : JSON.stringify(data)}</div>
}
export default Stat
