const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0.mbtqu.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Subscription {
    bookAdded: Book!
  } 
  type Mutation {
    addBook (
        title: String!
        author: String!
        published: Int!
        genres: [String]!
    ): Book
    editAuthor (
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String]
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments({}),
        authorCount: async () => await Author.countDocuments({}),
        allBooks: async (root, args) => {
            if (args.genre) {
                return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
            }
            return await Book.find({}).populate('author')
        },
        allAuthors: async () => {
            let authors = await Author.find({}).populate('Books')
            for (let i = 0; i < authors.length; i++) {
                authors[i].bookCount = authors[i].books.length
            }
            return authors
        },
        me: async (root, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("Invalid token")
            }
            try {
                const book = new Book({ ...args })
                let author = await Author.findOne({ name: args.author })
                if (!author) {
                    author = new Author({ name: args.author })
                }
                book.author = author
                const savedBook = await book.save()
                author.books.push(savedBook)
                await author.save()
                pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
                return savedBook
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("Invalid token")
            }
            let author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo
            return await author.save()
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'password') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})