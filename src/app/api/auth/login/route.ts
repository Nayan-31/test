import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name : "backend sikh rahe hai nexttt me bidu!!!"
  })
}