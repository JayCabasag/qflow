import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIdentifier(text: string) {
  if (text.length <= 7) return text;
  return `${text.slice(0, 4)}...${text.slice(-3)}`;
}
