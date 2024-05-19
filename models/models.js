const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    sumDonated: { type: DataTypes.DECIMAL, defaultValue: 0 },
    category: { type: DataTypes.STRING, allowNull: false },
});

const Donation = sequelize.define('donation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.DECIMAL, allowNull: false }
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false }
});

// Relationships
User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Donation, { foreignKey: 'userId' });
Donation.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Donation, { foreignKey: 'projectId' });
Donation.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Comment, { foreignKey: 'projectId' });
Comment.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
    User,
    Project,
    Donation,
    Comment
};
