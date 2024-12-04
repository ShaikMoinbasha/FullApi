import supabase from "../common/DBconnection.ts";

export async function getContestCount(contest_id: string, entry_id: string) {
  const { data, error } = await supabase
    .from("Contest_Entry")
    .select("*")
    .eq("contest_id", contest_id)
    .eq("entry_id", entry_id);

  if (error) {
    console.error("Error fetching contest count:", error);
    throw new Error(`Error fetching contest count: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error("No matching entries found.");
  }

  return data; // Return the data array directly
}

export default async function update_contest_entry_status(contest_id: string, entry_id: string, new_status: string) {
  const { data, error } = await supabase
    .from("Contest_Entry")
    .update({ status: new_status }) // Only update the `status` field
    .eq("contest_id", contest_id)
    .eq("entry_id", entry_id)
    .select(); // Ensure updated rows are returned

  if (error) {
    console.error("Error updating contest entry:", error);
    throw new Error(`Error updating contest entry: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error("No entries were updated.");
  }

  return data; // Return the updated data
}
