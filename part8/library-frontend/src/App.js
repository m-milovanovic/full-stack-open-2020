
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const token = localStorage.getItem('userToken')
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?
            <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={() => {
                localStorage.removeItem('userToken')
                window.location.reload()
              }}>logout</button>
            </span>
            :
            <button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
      />

      <Recommend 
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App