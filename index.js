const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import ApolloServer from apollo-server-express
const { ApolloServer } = require('apollo-server-express');

// Load environment variables
dotenv.config();

// Import your GraphQL schema (typeDefs) and resolvers
const typeDefs = require('./schema');   // <-- Update the path as needed
const resolvers = require('./resolvers'); // <-- Update the path as needed

// MongoDB Atlas connection string (from .env)
const mongodb_atlas_url = process.env.MONGODB_URL || 'YOUR_FALLBACK_URL';

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Success: Connected to MongoDB Atlas');
  } catch (error) {
    console.log('Error connecting to DB:', error.message);
  }
};

async function startServer() {
  // Initialize Express
  const app = express();
  app.use(express.json());
  app.use('*', cors());

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  // Connect to MongoDB
  await connectDB();

  // Start listening
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Actually start the server
startServer();
