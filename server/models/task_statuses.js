const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_statuses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "task_statuses_name_key"
    }
  }, {
    sequelize,
    tableName: 'task_statuses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "task_statuses_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "task_statuses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
