var DataTypes = require("sequelize").DataTypes;
var _task_priorities = require("./task_priorities");
var _task_statuses = require("./task_statuses");
var _tasks = require("./tasks");
var _users = require("./users");

function initModels(sequelize) {
  var task_priorities = _task_priorities(sequelize, DataTypes);
  var task_statuses = _task_statuses(sequelize, DataTypes);
  var tasks = _tasks(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  tasks.belongsTo(task_priorities, { as: "priority", foreignKey: "priority_id"});
  task_priorities.hasMany(tasks, { as: "tasks", foreignKey: "priority_id"});
  tasks.belongsTo(task_statuses, { as: "status", foreignKey: "status_id"});
  task_statuses.hasMany(tasks, { as: "tasks", foreignKey: "status_id"});
  tasks.belongsTo(users, { as: "assignee", foreignKey: "assignee_id"});
  users.hasMany(tasks, { as: "tasks", foreignKey: "assignee_id"});
  tasks.belongsTo(users, { as: "creator", foreignKey: "creator_id"});
  users.hasMany(tasks, { as: "creator_tasks", foreignKey: "creator_id"});
  users.belongsTo(users, { as: "supervisor", foreignKey: "supervisor_id"});
  users.hasMany(users, { as: "subordinates", foreignKey: "supervisor_id"});

  return {
    task_priorities,
    task_statuses,
    tasks,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
