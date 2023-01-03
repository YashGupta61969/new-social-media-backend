module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('post', {
        image: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        visiblity: {
            type: DataTypes.STRING,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Posts
}