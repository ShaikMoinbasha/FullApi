import getContestById from "../Repository/get_contest_repo.ts";


export default async function get_Contest_Data(req:Request) {
    try{
        const url = new URL(req.url);
        const contestId=url.searchParams.get("contest_id");
        if(!contestId){
            return new Response(
                JSON.stringify("Invalid Contest Id"),
                {status:400,headers:{"Contest-Type":"application/json"}}
            );
            
        }

       const data= await getContestById(contestId);

        if(!data || data.length==0){
            return new Response(
                JSON.stringify({message:"Id not present in contest table"}),
                {status:404,headers:{"Content-Type":"application/json"}}
            );
        }

        return new Response(
            JSON.stringify(data),
            {status:200,headers:{"Content-Type":"application/json"}}
        );
    }catch(error){
        console.error("Error fetching the data:", error);
        return new Response(
            JSON.stringify("error in DataBase Fetching"),
            {status:500 ,headers:{"content-type":"application/json"}}
        )
    }
    
    
}