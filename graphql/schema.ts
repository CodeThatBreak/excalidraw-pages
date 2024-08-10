export const typeDefs = `
    scalar JSON
    scalar JSONObject
    scalar Date

    type Scene {
        id: ID!
        name: String!
        version: Int!
        createdAt: Date!
        updatedAt: Date!
        elements: JSON
        state: JSON
    }

    type Query {
        fetchScene(id:String!): Scene!
        fetchScenes(searchQuery: String): [Scene!]!
        
    }

    type Mutation {
        updateScene(id: String!, name: String, elements: JSON, state: JSON): String
        createScene: String
    }
`;
