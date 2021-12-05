const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// create User model
class User extends Model {
   //  method  to check password per comparison
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// define table columns and configuration
User.init(
  {
    // id column
    id: {
       // using the special Sequelize DataTypes object providing an integer data type to the id 
      type: DataTypes.INTEGER,
     // equivalent of SQL "NOT NULL"
      allowNull: false,
       //  setting the primary key
      primaryKey: true,
      //  put it on auto increment
      autoIncrement: true,
    },
    //  username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     //  email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
     //  password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // direct sequelize conection to our db
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // set underscores
    underscored: true,
    // set the model name to lower case
    modelName: 'user',
  }
);

module.exports = User;
