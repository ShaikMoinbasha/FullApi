
import { createClient } from "npm:@supabase/supabase-js";
import ContestEntryModel from "../model/contest_entry_model.ts";
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);


export async function validateContest(contestId: string) {
    try {
        console.log("contest function")
        const{data:contestData,error}=await supabase
        .from('contest')
        .select('*')
        .eq('contest_id',contestId);
 
        if(error){
          throw new Error(`Database Error ${error}`);
        }
 
        return contestData;
      } catch (error) {
        throw new Error(`Invalid Contest  ${error}`);
      }
 

}

export async function validateMeme(memeId: string) {
    try {
        console.log("meme function")
        const{data:MemeData,error}=await supabase
        .from('memes')
        .select('*')
        .eq('meme_id',memeId);
 
        if(error){
          throw new Error(`Database Error ${error}`);
        }
 
        return MemeData;
      } catch (error) {
        throw new Error(`Invalid Meme ${error}`);
      }
    }

    export async function validateUser(userId: string) {
        try {
            console.log("user function")
            const{data:userData,error}=await supabase
            .from('User')
            .select('*')
            .eq('user_id',userId);
     
            if(error){
              throw new Error(`Database Error ${error}`);
            }

            return userData;
          } catch (error) {
            throw new Error(`invalid user ${error}`);
          }
        }


export async function checkExistingEntry(contestId: string, memeId: string) {
    console.log("check function")
  const { data, error } = await supabase
  
    .from("Contest_Entry")
    .select("*")
    .eq("contest_id", contestId)
    .eq("meme_id", memeId);


  if (error) {
    console.error("Error checking existing entry:", error);
    return null;
  }
 

  return data;
}


    export async function insertContestEntry(entry: ContestEntryModel) {
        console.log("Insert function")
        const { data, error } = await supabase
          .from("Contest_Entry")
          .insert(entry)
          .select("*");
      
        if (error) {
          console.error("Error inserting contest entry:", error);
          throw new Error(error.message);
        }
      
        return data;
      }
      

