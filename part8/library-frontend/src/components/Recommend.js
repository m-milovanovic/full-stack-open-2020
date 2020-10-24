import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../helpers/queries'

const Recommend = ({ show }) => {

    const [books, setBooks] = useState([])
    const [getMe, resultMe] = useLazyQuery(ME, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-only',
    })
    const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (show) {
            getMe()
        }
    }, [getMe, show])

    useEffect(() => {
        if (resultMe.data && resultMe.data.me) {
            getBooks({ variables: { genre: resultMe.data.me.favoriteGenre } })
        }
    }, [resultMe, getBooks])

    useEffect(() => {
        if (resultBooks.data && resultBooks.data.allBooks) {
            setBooks(resultBooks.data.allBooks)
        }
    }, [resultBooks])

    if (!show) {
        return null
    }
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{resultMe.data && resultMe.data.me.favoriteGenre}</b></p>
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
        </div>
    )
}

export default Recommend