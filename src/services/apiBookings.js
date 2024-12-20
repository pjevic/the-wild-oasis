/** @format */

// eq: equal, gte: greter then, lte: less then

import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constance";

import { getToday } from "../utils/helpers";

export async function createBooking(bookingData) {
  const { data, error } = await supabase.from("bookings").insert([bookingData]);

  if (error) {
    console.error("Error creating a booking:", error.message);
    return null;
  }

  return data;
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER:
  if (filter) query.eq(filter.field, filter.value);

  // SORT:
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

// DASHBOARD //

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 7, 30, 90 days..
// date: ISOString

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getTodaysActivities() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function getAvailableCabins(startDate, endDate, maxCapacity) {
  const { data: bookedCabins, error } = await supabase
    .from("bookings")
    .select("cabinID, status")
    .lte("startDate", endDate)
    .neq("status", "checked-out");

  if (error) {
    console.error(error);
    throw new Error("Available cabins could not be fetched");
  }

  const bookedCabinIDs = bookedCabins.map((item) => item.cabinID);

  // Get all cabin IDs from the "cabins" table
  const { data: allCabins, error: allCabinsError } = await supabase
    .from("cabins")
    .select("id, name, regularPrice, discount, maxCapacity, image")
    .gte("maxCapacity", maxCapacity);

  if (allCabinsError) {
    console.error(allCabinsError);
    throw new Error("Could not fetch all cabin IDs");
  }

  // Filter out cabins that have bookings in the given date range
  const data = allCabins.filter((cabin) => !bookedCabinIDs.includes(cabin.id));

  return data; // Returns
}

export async function getMostRecentlyCreatedBooking() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching most recent booking:", error);
    return null;
  }

  return data;
}
