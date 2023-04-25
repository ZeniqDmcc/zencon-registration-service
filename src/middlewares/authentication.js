import httpCodes from "../constants/httpCodes.js";
import { sequelize,QueryTypes } from "../config/db.js";
import apiResponse from "../utils/apiResponse.js";

export default async (req,res,next)=>{
    console.log(req.headers);
    if(req.headers["hkey"] !== process.env.HKEY){
        return next();
    }
    const ethAddress = req.headers["token"];
    if(!ethAddress){
        return res.status(httpCodes.UNAUTHORIZED).json(apiResponse({errors:["Sorry!! Unauthorized access"]}));
    }
    const [results, metadata] = await sequelize.query(
        "SELECT * FROM lap_comradewallets WHERE eth_wallet_address=$eth_wallet_address",
        {
        bind: {
            eth_wallet_address:ethAddress,
            type:QueryTypes.SELECT
        }
    });
    if(!results.length){
        return res.status(httpCodes.UNAUTHORIZED).json(apiResponse({errors:["Sorry!! Unauthorized access"]}));
    }
    req.eth_address = ethAddress;
    req.session_id = results[0].comrade_id;
    console.log(results)
    return next()
}