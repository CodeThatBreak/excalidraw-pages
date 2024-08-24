import { DateTime } from "luxon";
import { GraphQLJSON, GraphQLDateTime } from "graphql-scalars";
import { GraphQLError } from "graphql";

// Constant
import { Op } from "sequelize";

// Utils
import { insertIf } from "@/utils/object/insertIf";

// Models
import { Scene } from "../model/scene";
import { Preference } from "../model/preference";

interface FetchSceneArgs {
  id: string;
}

interface FetchScenesArgs {
  searchQuery?: string;
}

interface FetchPreferenceArgs {
  key: string;
}

interface UpdateSceneArgs {
  id: string;
  name: string;
  version: number;
  elements: any[];
  state: any;
}

interface UpdatePreferenceArgs {
  key: string;
  value: object;
}

interface DeleteSceneArgs {
  id: string;
}

enum ErrorType {
  SCENE_NOT_FOUND = "SCENE_NOT_FOUND",
}

const SCRIBBLED_ID = "scribble";

const resolvers = {
  Query: {
    fetchScene: async (_: any, args: FetchSceneArgs) => {
      const { id } = args;

      try {
        const scene = await Scene.findByPk(id);

        if (id === SCRIBBLED_ID && !scene) {
          const scribbleScene = await Scene.create({
            // @ts-ignore
            id: SCRIBBLED_ID,
            name: "Scribble",
            version: Date.now(),
            elements: [],
            state: { zoom: { value: 1 } },
          });

          return scribbleScene;
        }

        if (!scene) {
          return Promise.reject(
            new GraphQLError(
              `ERROR_CODE:${ErrorType.SCENE_NOT_FOUND}. Failed to fetch scene. `
            )
          );
        }
        return scene;
      } catch (error) {
        return Promise.reject(new GraphQLError(`Unexpected error occured`));
      }
    },
    fetchScenes: async (_: any, args: FetchScenesArgs) => {
      const { searchQuery } = args;
      try {
        const scenes = await Scene.findAll({
          order: [["updatedAt", "DESC"]],
          where: {
            ...insertIf(searchQuery, {
              name: {
                [Op.like]: `%${searchQuery}%`,
              },
            }),
            id: { [Op.notIn]: [SCRIBBLED_ID] },
          },
        });

        if (!scenes.length) {
          return []; // Return an empty array if no scenes are found
        }
        return scenes;
      } catch (error) {
        console.error("Error fetching scenes:", error);
        throw new Error("Failed to fetch scenes");
      }
    },

    // Preference
    fetchPreference: async (_: any, args: FetchPreferenceArgs) => {
      const { key } = args;

      const preference = await Preference.findOne({ where: { key } });

      return preference;
    },
  },
  JSON: GraphQLJSON,
  Date: GraphQLDateTime,

  Mutation: {
    updateScene: async (_: any, args: UpdateSceneArgs) => {
      const { id, name, version, elements, state } = args;
      try {
        const [affectedRowCount] = await Scene.update(
          { name, version, elements, state },
          { where: { id } }
        );

        if (affectedRowCount === 0) {
          throw new Error(`Scene with ID ${id} not found`);
        }

        return id;
      } catch (error) {
        console.error("Error updating scene:", error);
        throw new Error("Failed to update scene");
      }
    },
    createScene: async () => {
      try {
        const createdScene = await Scene.create({
          name: `Untitled_${DateTime.fromJSDate(new Date()).toFormat(
            "yyyy-MM-dd_HHmmss"
          )}`,
          version: Date.now(),
          elements: [],
          state: { zoom: { value: 1 } },
        });

        if (!createdScene) {
          throw new Error("Failed to create scene");
        }

        return createdScene.id;
      } catch (error) {
        console.error("Error creating scene:", error);
        throw new Error("Failed to create scene");
      }
    },
    deleteScene: async (_: any, args: DeleteSceneArgs) => {
      const { id } = args;

      try {
        const deletedRowCount = await Scene.destroy({
          where: { id },
        });

        if (deletedRowCount === 0) {
          return Promise.reject(
            new GraphQLError(
              `ERROR_CODE:${ErrorType.SCENE_NOT_FOUND}. Failed to delete scene. `
            )
          );
        }

        return deletedRowCount === 1;
      } catch (error) {
        console.error("Error updating scene:", error);
        return Promise.reject(new GraphQLError(`Unexpected error.`));
      }
    },

    // Preference
    updatePreference: async (_: any, args: UpdatePreferenceArgs) => {
      const { key, value } = args;

      await Preference.upsert({ key, value });

      return null;
    },
  },
};

export { resolvers };
