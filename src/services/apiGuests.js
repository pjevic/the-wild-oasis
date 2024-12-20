/** @format */

import supabase from "./supabase";

export async function createGuest(guestData) {
  const { data, error } = await supabase.from("guests").insert([guestData]);

  if (error) {
    console.error("Error creating a guest:", error.message);
    return null;
  }

  return data;
}

export async function getMostRecentlyCreatedGuest() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching most recent guest:", error);
    return null;
  }

  return data;
}
