require('dotenv').config()
const express = require('express')
const { verifyToken } = require('./middleware/verifyToken')
const app = express()
const Route = require('./routes/route')
// const { ApolloServer } = require('apollo-server-express')

// const typeDefs = require('./controllers/schema/post')
// const resolvers = require('./controllers/resolvers/post')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let port = process.env.PORT || 3000

app.use(verifyToken)
app.use('/', Route)

// async function startApolloServer () {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//       return req
//     }
//   })

//   await server.start()

//   server.applyMiddleware({
//     app,
//     path: '/graphql'
//   })
// }
// startApolloServer()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
