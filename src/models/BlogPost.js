module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
      }, {
          tableName: 'blog_posts',
          timestamps: false,
          underscored: true,
        });
  
    BlogPost.associate = ({ User }) => {
        BlogPost.belongsTo(User, {
              as: 'users',
              foreignKey: 'userId',
            })
          }
        
          return BlogPost;
  };