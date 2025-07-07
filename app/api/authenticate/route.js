import { DeepgramError, createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";

export async function POST() {
  // exit early so we don't request 70000000 keys while in devmode
  if (process.env.API_KEY_STRATEGY === "provided") {
    return NextResponse.json(
      process.env.DEEPGRAM_API_KEY
        ? { key: process.env.DEEPGRAM_API_KEY }
        : new DeepgramError(
            "Can't do local development without setting a `DEEPGRAM_API_KEY` environment variable.",
          ),
    );
  }

  const deepgram = createClient(process.env.DEEPGRAM_API_KEY ?? "");
  let { result: token, error: tokenError } = await deepgram.auth.grantToken();

  if (tokenError) {
    return NextResponse.json(tokenError);
  }

  return NextResponse.json({ ...token });
}
