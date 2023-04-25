import axios from "axios";
const CREAT_TICKETS_API_PATH = process.env.CREAT_TICKETS_API_PATH || 'https://event.freshdesk.com/api/v2/tickets';

const apikey= process.env.FRESH_DISK_API_KEY || "40d2ZnHtv4HyjYakhj8R";
const password = process.env.FRESH_DISK_API_PASSWORD || "X";
const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: apikey,
      password
    }
  };
  
class Event{
    async create(data){
      try{
      const {
        first_name, 
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
        project_page,
        website,
        linkedin,
        github,
        travel_availability,
        has_a_team,
        twin_room_option,
        event_attendancy,
        subject="",
        project_info,
        team_registration,
        participantId
      }= data;
        subject = ` Zencon-2023 new participant #${participantId}`
        const description = `
            ${first_name} ${last_name} registered in Zencon-2023 event and these are the details:
                <br/>
                <br/>
                <b>Project Information:</b>
                <br/>
                ${project_info}
                <br/>
                <br/>
                <b>Participant Details:</b><br/>
                <ul>
                    <li>Name: ${first_name} ${last_name}</li>
                    <li>Date of birth: ${date_of_birth}</li>
                    <li>Nationality: ${nationality}</li>
                    <li>Country of residancy: ${country_of_residancy}</li>
                    <li>Phone: ${phone}</li>
                    <li>Professional status: ${professional_status}</li>
                    <li>Job title: ${job_title}</li>
                    <li>Company: ${company}</li>
                    <li>T-shirt size: ${tshirt_size}</li>
                    <li> Video presentation: ${video_presentation? video_presentation:"N/A"}</li>
                    <li>Project page: ${project_page?project_page:"N/A"}</li>
                    <li>Website: ${website?website:"N/A"}</li>
                    <li>Travel Avaliability: ${travel_availability?travel_availability:"N/A"}</li>
                    <li>Has a team?: ${has_a_team} ${has_a_team==="yes" && team_registration==="yes"? "and team members registered to attend ZENCON Rio":""}</li>
                    <li>Option to share room(twin)?: ${twin_room_option}</li>
                    <li>Blockchain Rio 2023 event attendancy?: ${event_attendancy}</li>
                    <li><a href="${linkedin}">Linkedin</a></li>
                    <li><a href="${github}">Github</a></li>
                </ul>
        `;
        const custom_fields = {};
      if(process.env.NODE_ENV==='production'){
          custom_fields['custom_fields']={
              "cf_category_level_1":process.env.cf_category_level_1 || "ZENCON Related",
              "cf_category_level_2":process.env.cf_category_level_2 || "Participant application",
              "cf_product":process.env.cf_product || "ZENCON"
          }
      }
        const ticketData = {
            description,
            subject,
            email,
            "priority": parseInt(process.env.TICKET_PRIORITY) || 1,
            "status": parseInt(process.env.TICKET_STATUS) || 2,
            "cc_emails": [],
            "group_id":parseInt(process.env.TICKET_GROUP_ID),
            ...custom_fields
        };
        await axios.post(CREAT_TICKETS_API_PATH, ticketData, config);
        return 200;
      }catch(err){
        console.log(err)
        return 500;
      }
    }
}
export default new Event();