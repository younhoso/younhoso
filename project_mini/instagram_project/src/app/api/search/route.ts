import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}