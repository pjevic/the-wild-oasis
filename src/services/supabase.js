/** @format */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xclzkipeiiszotburdie.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbHpraXBlaWlzem90YnVyZGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Njg4ODYsImV4cCI6MjA0OTE0NDg4Nn0.-5Rt7jGCx8IR1im4-gweWYp-jezUxFM7G79qNBPjQFg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
