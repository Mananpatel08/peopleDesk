import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
const PROFILE_BASE_URL = "https://www.pythonanywhere.com/user/mananpatel/files/home/mananpatel/ems-api/";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR check
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
}

export const getFileURL = (path: string): string | undefined => {
  if (!path) return undefined;
  const isValidURL = path.startsWith("http");
  if (isValidURL) return path;
  return `${PROFILE_BASE_URL}${path}`;
};