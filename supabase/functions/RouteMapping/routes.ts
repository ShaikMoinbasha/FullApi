import get_Contest_Data from "../handler/get_contest_handler.ts";
import update_Contest_entry from "../handler/patchContestHandler.ts";
import handleSubmitContestEntry from "../handler/postContestEntryHandler.ts";

 
type RouteHandler = (req: Request) => Promise<Response>;
type Router = Record<string, Record<string, RouteHandler>>;
 
//mapping all the routes in one place
export const AllRouters:Router={
    "/ContestEntry/":{
        POST:handleSubmitContestEntry
    },
    "/ContestEntry/getById/:id":{
        GET:get_Contest_Data
    },
    "/ContestEntry/updateById/:id": {
        PATCH:update_Contest_entry
   }
     
   }
 
