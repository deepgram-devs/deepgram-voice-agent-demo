import { convertFloat32ToInt16, downsample } from "../utils/audioUtils";
import nextConfig from "next.config.mjs";

export const getAuthToken = async () => {
  const result = await (await fetch(withBasePath("/api/authenticate"), { method: "POST" })).json();

  return result.access_token;
};

export const sendMicToSocket = (socket: WebSocket) => (event: AudioProcessingEvent) => {
  const inputData = event?.inputBuffer?.getChannelData(0);
  const downsampledData = downsample(inputData, 48000, 16000);
  const audioDataToSend = convertFloat32ToInt16(downsampledData);
  socket.send(audioDataToSend);
};

export const sendSocketMessage = (socket: WebSocket, message: DGMessage) => {
  socket.send(JSON.stringify(message));
};

export const sendKeepAliveMessage = (socket: WebSocket) => () => {
  sendSocketMessage(socket, { type: "KeepAlive" });
};

export interface AudioConfig {
  input: {
    encoding: string;
    sample_rate: number;
  };
  output: {
    encoding: string;
    sample_rate: number;
    container?: string;
  };
}

export interface AgentConfig {
  listen: { provider: { type: "deepgram"; model: string } };
  think: {
    provider: { type: string; model: string };
    prompt: string;
    functions?: LlmFunction[];
  };
  speak: SpeakConfig;
  greeting?: string;
}

export interface SpeakConfig {
  provider: { type: "deepgram"; model: string };
}

export interface StsConfig {
  type: "Settings";
  audio: AudioConfig;
  agent: AgentConfig;
  language?: string;
  experimental?: boolean;
}

export interface LlmFunction {
  name: string;
  description: string;
  parameters: LlmParameterObject | Record<string, never>;
  endpoint: {
    url: string;
    headers: Record<string, string>;
    method: string;
  };
}

export type LlmParameter = LlmParameterScalar | LlmParameterObject;

export interface LlmParameterBase {
  type: string;
  description?: string;
}

export interface LlmParameterObject extends LlmParameterBase {
  type: "object";
  properties: Record<string, LlmParameter>;
  required?: string[];
}

export interface LlmParameterScalar extends LlmParameterBase {
  type: "string" | "integer";
}

export interface Voice {
  name: string;
  canonical_name: string;
  metadata: {
    accent: string;
    gender: string;
    image: string;
    color: string;
    sample: string;
  };
}

export type DGMessage =
  | { type: "Settings"; audio: AudioConfig; agent: AgentConfig }
  | { type: "UpdatePrompt"; prompt: string }
  | { type: "UpdateSpeak"; speak: SpeakConfig }
  | { type: "KeepAlive" };

export const withBasePath = (path: string): string => {
  const basePath = nextConfig.basePath || "/";
  if (path === "/") return basePath;

  return basePath + path;
};
