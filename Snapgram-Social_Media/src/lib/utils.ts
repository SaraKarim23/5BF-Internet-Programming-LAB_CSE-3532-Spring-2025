import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file); 

export function timeAgo(dateString: string): string {
  const now: Date = new Date();
  const past: Date = new Date(dateString);
  const secondsAgo: number = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count: number = Math.floor(secondsAgo / secondsInUnit);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};


