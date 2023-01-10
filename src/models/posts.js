module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('post', {
        image: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
        visiblity: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Posts
}