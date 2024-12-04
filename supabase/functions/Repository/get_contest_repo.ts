import supabase from "../common/DBconnection.ts";

export default async function getContestById(contestId: string) {
  try {
    console.log(`Fetching contest data for ID: ${contestId}`);
    const { data, error } = await supabase
      .from("Contest_Entry")
      .select("*")
      .eq("contest_id", contestId)
      

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error(`Failed to fetch contest data: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    throw new Error("Unexpected error occurred while fetching contest data.");
  }
}
