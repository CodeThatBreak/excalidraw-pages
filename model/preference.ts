import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "Preference",
  timestamps: true,
})
export class Preference extends Model<
  Preference,
  PreferenceCreationAttributes
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  key!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  value!: object;
}

export interface PreferenceCreationAttributes {
  key: string;
  value: object;
}
