import React, { useEffect, useMemo, useRef } from 'react'
import ListCard from '../../components/list'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListData } from '../../services/question'
import { PAGE_SIZE, SEARCH_VALUE } from '../../components/type'
import Search from '../../components/search'
import './common.scss'

// import useLoadSearch from '../../hooks/useloadsearch'
const { Title } = Typography
interface Question {
  id: string
  title: string
  isPublish: boolean
  isStar: boolean
  count: number
  createdDate: string
  createdBy: string
}
const ListPage = () => {
  useTitle('我的问卷')

  const [started, setStarted] = React.useState<boolean>(false)

  const [page, setPage] = React.useState<number>(1)

  const [list, setList] = React.useState<Question[]>([])

  const [total, setTotal] = React.useState<number>(0)

  const [searchParams] = useSearchParams()

  const havaMore = total > list.length

  const searchValue = searchParams.get(SEARCH_VALUE) || ''

  const ref = useRef<HTMLDivElement>(null)

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListData({
        page,
        pageSize: PAGE_SIZE,
        searchValue
      })
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        const { list: listdata = [], total = 0 } = data
        setList(list.concat(listdata))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const footerDom = ref.current
      if (footerDom === null) return
      const domRef = footerDom.getBoundingClientRect()
      if (domRef === null) return
      const { bottom } = domRef
      if (bottom < document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000
    }
  )

  const isLoadMore = useMemo(() => {
    if (!started || loading) {
      return <Spin />
    }
    if (!havaMore) {
      return <div>没有更多数据了</div>
    }
    if (total === 0) {
      return <Empty description='暂无数据' />
    }
    return <span>加载下一页</span>
  }, [loading])

  useEffect(() => {
    setList([])
    setPage(1)
    setStarted(false)
    setTotal(0)
  }, [searchValue])

  useEffect(() => {
    tryLoadMore()
    if (havaMore) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, havaMore])

  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className='right'>
          <Search />
        </div>
      </div>
      <div className='main'>
        {loading && (
          <div className='spin'>
            <Spin />
          </div>
        )}
        {list.length > 0 &&
          list.map((item: Question) => {
            const { id, title, isPublish, isStar, count, createdDate, createdBy } = item
            return (
              <div key={id}>
                <ListCard
                  id={id}
                  title={title}
                  isPublish={isPublish}
                  count={count}
                  isStar={isStar}
                  createdDate={createdDate}
                  createdBy={createdBy}
                />
              </div>
            )
          })}
      </div>
      <div className='footer' ref={ref}>
        {isLoadMore}
      </div>
    </div>
  )
}
export default ListPage
