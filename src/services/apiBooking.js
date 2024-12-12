/** @format */

// eq: equal, gte: greter then, lte: less then

import supabase from "./supabase";

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
    );

  // FILTER:
  if (filter) query.eq(filter.field, filter.value);

  // SORT:
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}
