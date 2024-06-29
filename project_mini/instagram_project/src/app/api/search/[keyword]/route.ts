import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
