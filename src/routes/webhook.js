import { Router } from "express";
import httpCodes from "../constants/httpCodes.js";
import apiResponse from "../utils/apiResponse.js";
import { Participant } from "../models/Participant.js";
import { Statuses } from "../constants/enum.js";
const router = Router();

router.post("/tickets", async(req,res)=>{
  try{
    const {freshdesk_webhook:{ticket_status,ticket_contact_email}} = req.body;
    let shortlisted;
    if(ticket_status === Statuses.Shortlisted){
      shortlisted=true;
    }
    if(ticket_status === Statuses.Rejected){
      shortlisted=false;
    }
    if(ticket_status === Statuses.Shortlisted || ticket_status === Statuses.Rejected){
      
      await Participant.update({ shortlisted }, {
        where: {
          email: ticket_contact_email
        }
      });
    }
    return res.status(httpCodes.OK).json(apiResponse({data:"Your data sent successfully"}));
  }catch(error){
    
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(apiResponse({errors:[error.message]}));
  }

});

export default router;