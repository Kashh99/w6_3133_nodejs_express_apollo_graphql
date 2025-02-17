const Movie = require('./models/Movie');

const resolvers = {
  Query: {
    // 1) Get all movies
    getAllMovies: async () => {
      // Return all movies from MongoDB
      try {
        const allMovies = await Movie.find(); 
        return allMovies;
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    // 2) Get a specific movie by ID
    getMovieById: async (parent, args) => {
      const { id } = args;
      try {
        const movie = await Movie.findById(id);
        return movie;  // returns null if not found
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },

  Mutation: {
    // 3a) Insert (create) a new movie
    createMovie: async (parent, args) => {
      try {
        // Create a new movie document
        const newMovie = new Movie({
          name: args.name,
          director_name: args.director_name,
          production_house: args.production_house,
          release_date: args.release_date,
          rating: args.rating
        });
        // Save to MongoDB
        const savedMovie = await newMovie.save();
        return savedMovie;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create movie');
      }
    },

    // 3b) Update an existing movie by ID
    updateMovie: async (parent, args) => {
      try {
        // Destructure the ID, and gather updates separately
        const { id, ...updates } = args;

        // Find the movie by ID and update its fields
        const updatedMovie = await Movie.findByIdAndUpdate(id, updates, {
          new: true,       // return the updated doc
          runValidators: true
        });

        if (!updatedMovie) {
          throw new Error('Movie not found');
        }
        return updatedMovie;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update movie');
      }
    },

    // 3c) Delete an existing movie by ID
    deleteMovie: async (parent, args) => {
      try {
        const { id } = args;
        const deletedMovie = await Movie.findByIdAndRemove(id);

        if (!deletedMovie) {
          return "Movie not found";
        }
        return "Movie deleted successfully";
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete movie');
      }
    },
  }
};

module.exports = resolvers;
