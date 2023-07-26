import { Availability } from "@/types";

export const AVAILABILITY: Availability = "available";
export const BASE_URL =
  process.env.NODE_ENV == "production"
    ? String(process.env.NEXT_PUBLIC_BASE_URL)
    : "http://localhost:3000";

export const META = {
  name: "Charly Martin",
  title: "Senior Software Developer",
};
