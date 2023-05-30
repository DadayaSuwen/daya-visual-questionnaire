import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListData } from '../services/question'
import { SEARCH_VALUE } from '../components/type'

type SearchOption = {
  isStar: boolean
  isDeleted: boolean
}
const useLoadSearch = (option: Partial<SearchOption> = {}) => {
  const { isStar = false, isDeleted = false } = option
  const [SearchParams] = useSearchParams()
  const { data, loading, error } = useRequest(
    async () => {
      const searchValue = SearchParams.get(SEARCH_VALUE) || ''
      const data = await getQuestionListData({ searchValue, isStar, isDeleted })
      return data
    },
    {
      refreshDeps: [SearchParams]
    }
  )
  return {
    data,
    loading,
    error
  }
}

export default useLoadSearch
