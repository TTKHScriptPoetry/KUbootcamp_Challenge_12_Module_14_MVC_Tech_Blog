const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
}

Post.init(
   {
      id: {
         type: DataTypes.INTEGER, 
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      post_content:{
         type: DataTypes.TEXT,
         allowNull: false,
         
      },
      // -- defined as the foreign key and will be the matching link.
      // -- determines who posted the news article
      user_id:{ 
         type: DataTypes.INTEGER,
         references:{
            model: 'mod14user',
            key: 'id'
         }
      } // last entity
   }, // end of 1st object      
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'mod14post'
      
   }

   
);


module.exports = Post;