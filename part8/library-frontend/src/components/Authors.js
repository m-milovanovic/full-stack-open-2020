
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UPDATE_AUTHOR } from '../helpers/mutations'
import { ALL_AUTHORS } from '../helpers/queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [authors, setAuthors] = useState([])
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  useEffect(() => {
    authors[0] && setAuthor(authors[0].name)
  }, [authors])

  if (!props.show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const bornNum = +born
    updateAuthor({ variables: { name: author, setBornTo: bornNum } })
    setBorn('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          author
            <select onChange={(e) => setAuthor(e.target.value)} value={author}>
            {
              authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)
            }
          </select>
        </div>
        <div>
          born
            <input type='number' value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
