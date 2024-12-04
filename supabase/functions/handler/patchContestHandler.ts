import update_contest_entry_status, { getContestCount } from "../Repository/patchContestRepo.ts";


export default async function update_Contest_entry(req: Request) {
  try {
    const { contest_id, entry_id, new_status } = await req.json();

    // Validate input
    if (!contest_id || !entry_id || !new_status) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON. Provide contest_id, entry_id, and new_status." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch existing contest entry
    const count = await getContestCount(contest_id, entry_id);

    if (!count || count.length === 0) {
      return new Response(
        JSON.stringify({ error: "No matching entries found in Contest_Entry table." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the status
    const updatedData = await update_contest_entry_status(contest_id, entry_id, new_status);

    return new Response(
      JSON.stringify({ message: "Updated successfully in Contest_Entry table", data: updatedData }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }catch (error) {
    console.error("Error in update_Contest_entry:", error);
  
    // Check if the error is an instance of Error and has a message
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
  
    return new Response(
      JSON.stringify({ error: "Server error", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  
}
