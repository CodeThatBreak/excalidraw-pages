import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "Scenes",
  timestamps: true,
})
export class Scene extends Model<Scene, SceneCreationAttributes> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  version!: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  elements!: object[];

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  state!: object;
}

// Define the creation attributes interface
export interface SceneCreationAttributes {
  name: string;
  version: number;
  elements: object[];
  state: object;
}
