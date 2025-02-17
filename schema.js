const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Movie Type
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String
    release_date: String
    rating: Float
  }

  # Queries
  type Query {
    getAllMovies: [Movie]
    getMovieById(id: ID!): Movie
  }

  # Mutations
  type Mutation {
    createMovie(
      name: String!
      director_name: String!
      production_house: String
      release_date: String
      rating: Float
    ): Movie

    updateMovie(
      id: ID!
      name: String
      director_name: String
      production_house: String
      release_date: String
      rating: Float
    ): Movie

    deleteMovie(id: ID!): String
  }
`;

module.exports = typeDefs;
