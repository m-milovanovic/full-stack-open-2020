import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query findBookByGenre ($genre: String){
  allBooks (genre: $genre) {
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`