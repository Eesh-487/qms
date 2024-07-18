const { Sequelize, DataTypes, QueryInterface } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '01000101',
  database: 'qms'
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

  Files.belongsTo(Entity, { foreignKey: 'folder_id' });

  module.exports ={
    Files
  }