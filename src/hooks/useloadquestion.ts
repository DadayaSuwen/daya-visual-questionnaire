import { useParams } from 'react-router-dom'
import { getQuestionList } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestion = () => {
  //   const [loading, setLoading] = useState(true)
  //   const [questionData, setQuestionData] = useState([])
  //   useEffect(() => {
  //     ;(async function () {
  //       const data = await getQuestionList(id)
  //       setQuestionData(data as [])
  //       setLoading(false)
  //     })()
  //   }, [])
  //   return { loading, questionData }
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
