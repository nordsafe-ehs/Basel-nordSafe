const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false, // كل سجل حضور مرتبط باجتماع
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false, // اسم المشارك
    },

    role: {
      type: DataTypes.STRING, // مثل: عضو، مدير، ضيف
    },

    status: {
      type: DataTypes.ENUM("present", "absent", "excused"),
      defaultValue: "present", // حالة الحضور
    },

    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // هل هو مسؤول؟
    },

    readOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // صلاحية قراءة فقط؟
    },

    mustSign: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // هل يجب أن يوقع؟
    },

    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // هل مشاركته مغلقة؟
    },

    responsibleCode: {
      type: DataTypes.STRING, // كود المسؤولية (مثل A1, B2...)
    },
  },
  {
    tableName: "attendance",
    timestamps: true, 
  }
);

module.exports = Attendance;
