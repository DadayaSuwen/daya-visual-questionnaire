import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { PAGE_SIZE, PAGE_VALUE, PAGE_SIZE_VALUE } from '../type'

interface PageProps {
  total: number
}

const ListPage = (props: PageProps) => {
  const { total } = props
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const pageChange = (page: number, pageSize: number) => {
    searchParams.set(PAGE_VALUE, page.toString())
    searchParams.set(PAGE_SIZE_VALUE, pageSize.toString())
    navigate({
      pathname,
      search: searchParams.toString()
    })
  }
  useEffect(() => {
    const page = parseInt(searchParams.get(PAGE_VALUE) || '') || 1
    setPage(page)
    const pageSize = parseInt(searchParams.get(PAGE_SIZE_VALUE) || '') || PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  return <Pagination current={page} pageSize={pageSize} total={total} onChange={pageChange} />
}

export default ListPage
