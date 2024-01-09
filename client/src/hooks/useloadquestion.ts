import { useParams } from 'react-router-dom'
import { getQuestionList } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestion = () => {
  const { id = '' } = useParams<{ id: string }>()
  async function load() {
    return await getQuestionList(id)
  }
  const { loading, data, error } = useRequest(load)
  return {
    loading,
    data,
    error
  }
}

export default useLoadQuestion
