const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: { max: 5, min:0 },
    logging:false,
    database:'test',
});

// console.log(DataTypes.UUID)
sequelize.authenticate().then(() => console.log('connected')).catch(err => console.log(err))

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, DataTypes)
db.posts = require('./posts')(sequelize, DataTypes)
db.comments = require('./comments')(sequelize, DataTypes)

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)

db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)

db.sequelize.sync({force:false}).then(() => {
    console.log('Synced')
})
.catch(err => {
    console.log(err)
})

module.exports = db;