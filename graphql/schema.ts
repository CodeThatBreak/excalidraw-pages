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

    type Preference {
        key:String
        value: JSON
    }

    type Query {
        fetchScene(id:String!): Scene!
        fetchScenes(searchQuery: String): [Scene!]!
        fetchPreference(key:String): Preference
        
    }

    type Mutation {
        updateScene(id: String!, name: String, elements: JSON, state: JSON): String
        createScene: String
        deleteScene(id:String!): Boolean
        updatePreference(key:String!, value: JSON):Boolean
    }   

`;
