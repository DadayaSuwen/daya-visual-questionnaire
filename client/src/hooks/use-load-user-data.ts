import { useEffect, useState } from 'react'
import useGetInfo from './use-get-info'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/user'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: result => {
      const { username } = result
      dispatch(loginReducer({ username }))
    },
    onFinally: () => {
      setWaitingUserData(false)
    }
  })
  const { username } = useGetInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])
  return { waitingUserData }
}

export default useLoadUserData
