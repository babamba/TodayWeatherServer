import dotenv from "dotenv"
import path from "path";
// dotenv.config({path: path.resolve(__dirname, ".env")});
import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./middlewares";


const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
     //typeDefs, resolvers
     schema, 
     context: ({request}) => ({request, isAuthenticated})
})

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//server.express.use(passport.authenticate("jwt"));

server.start({port:PORT}, () => 
     console.log(`🎉🎉  SERVER running on http://localhost:${PORT}`)
);

// console.log(__dirname)

// const typeDefs = `
//      type Query{
//           hello:String!
//      }
// `

// const resolvers = {
//      Query: {
//           hello : () => "Hi"
//      }
// }