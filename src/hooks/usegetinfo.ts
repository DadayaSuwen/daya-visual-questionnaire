import { useSelector } from 'react-redux'
import type { State } from '../store'
import type { User } from '../store/user'

function useGetInfo() {
  const { username } = useSelector((state: State) => state.user) as User
  return { username }
}

export default useGetInfo
