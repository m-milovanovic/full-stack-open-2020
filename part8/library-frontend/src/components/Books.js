import { useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../helpers/queries'
import { BOOK_ADDED } from '../helpers/subscriptions'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network'
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      setBooks([...books, subscriptionData.data.bookAdded])
    }
  })

  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (props.show)
      getBooks()
  }, [getBooks, props.show])

  const filter = (value) => {
    if (value) {
      getBooks({ variables: { genre: value } })
    } else {
      getBooks()
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => filter('SciFi')}>SciFi</button>
      <button onClick={() => filter('Fantasy')}>Fantasy</button>
      <button onClick={() => filter('Economics')}>Economics</button>
      <button onClick={() => filter(null)}>All genres</button>
    </div>
  )
}

export default Books