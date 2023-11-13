interface FetchBaseResultApi {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
}

type ID = number | string

type DateValue = moment.Moment | string
