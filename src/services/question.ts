import axios, { ResDataType } from './ajax'

type searchOption = {
  searchValue: string
  isDeleted: boolean
  isStar: boolean
  page: number
  pageSize: number
}

// 获取单个问卷
export async function getQuestionList(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
// 创建问卷
export async function createQuestionServer(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

export async function getQuestionListData(search: Partial<searchOption> = {}): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: search })) as ResDataType
  return data
}

export async function updateQuestionServer(id: string, opt: ResDataType): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

export async function duplicateQuestionServer(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

export async function deleteQuestionServer(id: string[]): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.delete(url, { data: id })) as ResDataType
  return data
}