// resolvers.js
import { GraphQLJSON, GraphQLDateTime } from "graphql-scalars";
import { Scene } from "../model/scene";
import { Op } from "sequelize";
import { DateTime } from "luxon";

const resolvers = {
  Query: {
    fetchScene: async (_, args) => {
      const { id } = args;
      console.log(_, args);
      const scene = await Scene.findByPk(id);

      if (!scene) {
        throw new Error("Error creating scene");
      }
      return scene;
    },
    fetchScenes: async (_, args) => {
      const { searchQuery } = args;

      const scenes = await Scene.findAll({
        order: [["updatedAt", "DESC"]],
        where: searchQuery ? { name: { [Op.like]: `%${searchQuery}%` } } : {},
      });
      if (!scenes) {
        throw new Error("Error finding scenes");
      }
      return scenes;
    },
  },
  JSON: GraphQLJSON,
  Date: GraphQLDateTime,

  // JSONResolver,
  Mutation: {
    updateScene: async (parent, args, context, info) => {
      const { id, name, version, elements, state } = args;

      try {
        const up = await Scene.update(
          { name, version, elements, state },
          {
            where: { id: id },
            returning: ["version"],
          }
        );

        return version;
      } catch (error) {
        console.error("Error updating scene:", error);
        throw error;
      }
    },
    createScene: async () => {
      const createdScene = await Scene.create({
        name: `Untitled ${DateTime.fromJSDate(new Date()).toFormat(
          "yyyy-LL-dd-hhmm"
        )}`,
        version: Date.now(),
        elements: [],
        state: { zoom: { value: 1 } },
      });

      if (!createdScene) {
        throw new Error("Error creating scene");
      }
      return createdScene.id;
    },
  },
};

export { resolvers };
