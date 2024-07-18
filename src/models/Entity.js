const { Sequelize, DataTypes, QueryInterface } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '01000101',
  database: 'qms'
});

const Entity = sequelize.define('Entity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Entities', // refers to table name
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attributes: {
    type: DataTypes.JSON,
    allowNull: true
  }
});

const Files = sequelize.define('Files', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  folder_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Entities',  
      key: 'id'
    }
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  upload_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  file_size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_mode: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Set up the associations
Entity.hasMany(Entity, { foreignKey: 'parent_id' });
Entity.hasMany(Files, { foreignKey: 'folder_id' });

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {``
  console.log('Database & tables created!');
});
module.exports = {
  Entity
  
}