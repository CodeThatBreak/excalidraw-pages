// Components
import { SceneCard } from "./component/card/SceneCard";
import { Grid } from "@radix-ui/themes";

// Types
import type { Scene } from "@/components/scene/types";

const SceneGrid = ({ scenes }: { scenes: Scene[] }) => {
  return (
    <Grid columns={{ md: "4", sm: "3", xs: "2" }} gap="4">
      {scenes.map((scene) => (
        <SceneCard key={scene.id} scene={scene} />
      ))}
    </Grid>
  );
};

export { SceneGrid };
