import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import {models}  from "./../constants/models.js"
const ModelName = models.ZenconParticipant;

export const Participant = sequelize.define(
    ModelName,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    date_of_birth: {
        type: DataTypes.STRING,
    },
    nationality: {
        type: DataTypes.STRING,
    },
    country_of_residancy: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    professional_status: {
        type: DataTypes.STRING,
    },
    job_title: {
        type: DataTypes.STRING,
    },
    company: {
        type: DataTypes.STRING,
    },
    tshirt_size: {
        type: DataTypes.STRING,
    },
    video_presentation: {
        type: DataTypes.STRING,
    },
    project_page: {
        type: DataTypes.STRING,
    },
    project_info: {
        type: DataTypes.TEXT,
    },
    website: {
        type: DataTypes.STRING,
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    github: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    travel_availability: {
        type: DataTypes.STRING,
    },
    has_a_team: {
      type:  DataTypes.STRING,
    },
    team_registration:{
        type:  DataTypes.STRING,
    },
    twin_room_option: {
        type:  DataTypes.STRING,
    },
    event_attendancy: {
        type:  DataTypes.STRING,
    },
    session_id: {
        type: DataTypes.STRING,
    },
    shortlisted: {
        type:  DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);