import React, { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import './index.scss'
import { SEARCH_VALUE } from '../type'

const { Search: OnSearch } = Input
const Search = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [searchValue, setSearchValue] = useState<string>('')

  const [searchParams] = useSearchParams()

  const hanldSearch = () => {
    navigate({
      pathname,
      search: `${SEARCH_VALUE}=${searchValue}`
    })
  }

  const hanldSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    if (event.target.value === '') {
      navigate({
        pathname,
        search: `${SEARCH_VALUE}=${event.target.value}`
      })
    }
  }

  useEffect(() => {
    const urlVal = searchParams.get(SEARCH_VALUE) || ''
    setSearchValue(urlVal)
  }, [searchParams])
  return (
    <>
      <OnSearch
        placeholder='输入搜索内容'
        value={searchValue}
        onChange={hanldSearchChange}
        onSearch={hanldSearch}
        className='search'
        allowClear
      />
    </>
  )
}
export default Search
