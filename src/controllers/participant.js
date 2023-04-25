import validateRegistration from "../validators/registration.js";
import httpCodes from "../constants/httpCodes.js";
import apiResponse from "../utils/apiResponse.js";
import { Participant } from "../models/Participant.js";
import events from "./events.js";
import {sequelize} from "./../config/db.js";

export const registerParticipant = async (req, res) => {
  try {
    const session_id = req.session_id;
    const { first_name, 
        last_name,
        date_of_birth,
        nationality,
        country_of_residancy,
        email,
        phone,
        professional_status,
        job_title,
        company,
        tshirt_size,
        video_presentation,
        project_info,
        project_page,
        website,
        linkedin,
        github,
        travel_availability,
        has_a_team,
        team_registration,
        twin_room_option,
        event_attendancy,
        country_code,
    } = req.body;
    const phone_with_country_code = `${country_code}${phone}`;
    const validateUserInput = await validateRegistration({...req.body,session_id});
    
    if(validateUserInput){
      return res.status(httpCodes.BAD_REQUEST).json(apiResponse({errors:validateUserInput}))
    }
    const participant = await Participant.create({
      first_name, 
      last_name,
      date_of_birth,
      nationality,
      country_of_residancy,
      email:email.toLowerCase(),
      phone:phone_with_country_code,
      professional_status,
      job_title,
      company,
      tshirt_size,
      video_presentation,
      project_page,
      website,
      linkedin,
      github,
      travel_availability,
      has_a_team,
      team_registration,
      twin_room_option,
      event_attendancy,
      project_info,
      session_id
    });

    const freshdiskResponse = await events.create({ 
      first_name, 
      last_name,
      date_of_birth,
      nationality,
      country_of_residancy,
      email,
      phone:`${country_code}${phone}`,
      professional_status,
      job_title,
      company,
      tshirt_size,
      video_presentation,
      project_page,
      project_info,
      website,
      linkedin,
      github,
      travel_availability,
      has_a_team,
      team_registration,
      twin_room_option,
      event_attendancy,
      session_id
    });
    if(freshdiskResponse === 500){
      await Participant.destroy({
        where: {
          id: participant.id
        },
        force: true
      });
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(apiResponse({errors:["Something went wrong please try again letter"]}));
    }
    return res.status(httpCodes.OK).json(apiResponse({data:{participant}}));
  } catch (error) {
    console.log(err)
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(apiResponse({errors:[error?.errors&&error?.errors[0]?.message || error.message]}));
  }
};
export const participantStatus = async(req,res)=>{
  try{
    const session_id = req.session_id;
    console.log("====================================================")
    console.log(session_id)
    console.log("====================================================")
    const participant = await Participant.findOne({ where: { session_id } });
    return res.status(httpCodes.OK).json(apiResponse({data:{participant}}));
  }catch(error){
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(apiResponse({errors:[error?.errors&&error?.errors[0]?.message || error.message]}));
  }
}