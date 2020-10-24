import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        title
        author{
            id
            name
        }
        published
        id
    }
}
`
export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name
        setBornTo: $setBornTo
    ) {
        name
        born
        bookCount
    }
}
`

export const LOGIN = gql`
mutation loginUser($username: String!, $password: String!){
    login(
        username: $username
        password: $password
    ) {
        value
    }
}
`