import { DataTypes, Model, Optional } from "sequelize";
import { dbInstance } from "../Config/Connection";

// 1. Define la interfaz con las propiedades del usuario
interface UserAttributes {
  id?: number;
  name: string;
  number: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define una interfaz para los campos opcionales al crear
type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt" | "updatedAt">;

// 3. Crea la clase que extiende Model con los tipos
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public number!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4. Define el modelo
User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance,
    tableName: "Users",
    timestamps: true,
  }
);

// 5. Exporta el modelo
export const UserModel = User;
