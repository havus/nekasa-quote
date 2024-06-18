import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(date: Date) : string {
  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let period = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12; // Jam 0 diubah menjadi 12

  let dayOfWeek = daysOfWeek[date.getDay()];
  let dayOfMonth = date.getDate();
  let month = monthsOfYear[date.getMonth()];
  let year = date.getFullYear();

  let result = `${hour}:${(minute < 10 ? '0' : '') + minute} ${period} - ${dayOfWeek}, `;
  result += `${dayOfMonth} ${month} ${year}`;

  return result;
}
