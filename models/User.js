// -- Imported the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// -- Create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    {
      // define an id column
      id: {
        type: DataTypes.INTEGER,  // use the special Sequelize DataTypes object provide what type of data it is
        allowNull: false,    // this is the equivalent of SQL's `NOT NULL` option
        primaryKey: true,    // instruct that this is the Primary Key
        autoIncrement: true  // turn on auto increment
      },
      // --define a username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // --define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,    // there cannot be any duplicate email values in this table
        validate: {
          isEmail: true  // if allowNull is set to false, we can run our data through validators before creating the table data
        }
      },
      // --define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]  // this means the password must be at least four characters long
        }
      }
    }, // end of 1st object
    {
      hooks:{
        // to inject hasing logic to occur just before a user is created:
        async beforeCreate(newUserData) { // userData stores the pre-hash
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        }
      },
       
      sequelize,   
      timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
      freezeTableName: true, // don't pluralize name of database table
      underscored: true, // use underscores instead of camel-casing  
      modelName: 'mod14user'  // make it so our model name stays lowercase in the database

    } // end of 2nd object
);

module.exports = User;