import ContestEntryModel from "../model/contest_entry_model.ts";
import { checkExistingEntry, insertContestEntry, validateContest, validateMeme, validateUser } from "../Repository/postContestEntryRepo.ts";


export default async function handleSubmitContestEntry(req: Request) {
  try {
    
     const body = await req.json();
     const entry=new ContestEntryModel(body);
     
     const contestPresent=await validateContest(entry.contest_id);

     if(!contestPresent|| contestPresent.length==0){
        return new Response(
            JSON.stringify({ error: "Invalid contest Id" }),
            { status: 400 }
          );
     }
     const memedata=await validateMeme(entry.meme_id);
     if(!memedata|| memedata.length==0){
        return new Response(
            JSON.stringify({ error: "Invalid meme Id" }),
            { status: 400 }
          );
     }
     const userData=await validateUser(entry.user_id);
     if(!userData|| userData.length==0){
        return new Response(
            JSON.stringify({ error: "Invalid user Id" }),
            { status: 400 }
          );
     }
     const checkEntry=await checkExistingEntry(entry.contest_id,entry.meme_id);

     if(checkEntry&&checkEntry.length>0){
        return new Response(
            JSON.stringify({ error: "entry already  present" }),
            { status: 400 }
          );
     }
     const insertedEntry=await insertContestEntry(entry);
     console.log(insertedEntry)
     if(insertedEntry.length==0){
        return new Response(
            JSON.stringify({ error: "Failed to insert entry " }),
            { status: 400 }
          );
     }
     return new Response(
        JSON.stringify("Entry Successfully inserted"),
        { status: 200 }
      );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Internal error ${error}`}),
      { status: 500 }
    );
  }
}
