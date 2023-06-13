module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      }, {
          tableName: 'blog_posts',
          timestamps: false,
          underscored: true,
        });
  
    BlogPost.associate = ({ User }) => {
        BlogPost.belongsTo(User, {
              as: 'user',
              foreignKey: 'userId',
            })
          }
        
          return BlogPost;
  };