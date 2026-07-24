import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DEFAULT_PROFILE, SignatureProfile } from "@/lib/templates/types";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "profile.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(DEFAULT_PROFILE, null, 2), "utf-8");
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const fileData = fs.readFileSync(FILE_PATH, "utf-8");
    const profile = JSON.parse(fileData);
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error reading profile file:", error);
    return NextResponse.json(DEFAULT_PROFILE);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    ensureDataFile();
    const updatedProfile: SignatureProfile = { ...DEFAULT_PROFILE, ...body };
    fs.writeFileSync(FILE_PATH, JSON.stringify(updatedProfile, null, 2), "utf-8");
    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Error saving profile file:", error);
    return NextResponse.json({ success: false, error: "Error al guardar los datos" }, { status: 500 });
  }
}
