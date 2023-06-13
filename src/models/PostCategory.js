module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'BlogPost', key: 'id'} },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'Category', key: 'id'}},
      }, {
          tableName: 'posts_categories',
          timestamps: false,
          underscored: true,
        });
  
        PostCategory.associate = ({ Category, BlogPost }) => {
            Category.belongsToMany(BlogPost, {
              as: 'blogPosts',
              through: PostCategory,
              foreignKey: 'categoryId',
              otherKey: 'postId'
            });
            BlogPost.belongsToMany(Category, {
              as: 'categories',
              through: PostCategory,
              foreignKey: 'postId',
              otherKey: 'categoryId'
            });
          }
        
          return PostCategory;
  };