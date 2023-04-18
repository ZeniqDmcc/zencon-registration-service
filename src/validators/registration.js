import Joi from "joi";
import eighteenYearsOld from "../utils/eighteenYearsOld.js";
const customValidation = (value, helpers) => {
    const words = value.trim().split(/\s+/);
    if (words.length > 500) {
      return helpers.message('Project info must contain at most 500 words');
    }
    return value;
  }
  
const {day,month,year} = eighteenYearsOld();
const registrationInputErrors = async({
    first_name, 
    last_name,
    date_of_birth,
    nationality,
    country_of_residancy,
    email,
    phone,
    country_code,
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
    terms_and_conditions,
    session_id
})=>{
   
    const schema = Joi.object({

        first_name: Joi.string()
            .trim()
            .min(5)
            .max(50)
            .required(),

        last_name: Joi.string()
            .trim()
            .min(5)
            .max(50)
            .required(),

        date_of_birth:Joi.date().less(`${year}-${month}-${day}`)
        .required(),//.less(`${day}-${month}-${year}`),
    
        phone:Joi.string()
        .trim()
        .required(), 

        country_code:Joi.string()
        .trim()
        .required(), 

        nationality:Joi.string()
        .trim()
        .required(),

        country_of_residancy:Joi.string()
        .trim()
        .required(),

        professional_status:Joi.string()
        .trim()
        .required(),

        company:Joi.string()
        .trim()
        .required(),

        tshirt_size:Joi.string()
        .trim()
        .required().valid('XS', 'S',"M","L","XL","XXL"),

        job_title:Joi.string()
        .trim()
        .required(),

        email:Joi.string()
        .email()
        .required(),
    
        website:Joi.string().uri().required().allow(''),

        linkedin:Joi.string().uri().required(),

        github:Joi.string().uri().required(),

        project_info:Joi.string().required().custom(customValidation).messages({"string.empty":"Please write a description about your project"}),

        video_presentation:Joi.string().uri().required().allow(''),

        project_page:Joi.string().uri().required().allow(''),
        
        session_id:Joi.string()
        .trim()
        .required(),

        travel_availability:Joi.string().required().valid('yes', 'no').label("Are you available to travel to Rio de Janeiro during the event?"),

        team_registration:Joi.string().required().valid('yes', 'no').label("Your team registered to attend ZENCON Rio?")
        .default("no"),
        
        has_a_team:Joi.string().required().valid('yes', 'no').label("Do you have a team?")
        .default("no"),

        twin_room_option:Joi.string().required().valid('yes', 'no').label("Option to share room")
        .default("no"),

        event_attendancy:Joi.string().required().valid('yes', 'no').label("Blockchain RIO 2023 attendancy")
        .default("no"),
        terms_and_conditions:Joi.string().required().messages({"string.empty":"You should accept the terms and conditions to register"})
    });
    const validateInputs = await schema.validate({
        first_name, 
        last_name,
        date_of_birth,
        nationality,
        country_of_residancy,
        email,
        phone,
        country_code,
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
        terms_and_conditions,
        session_id
    });
   
    return validateInputs?.error?.details.map(({message})=>{
        return message
    })
}

export default registrationInputErrors;