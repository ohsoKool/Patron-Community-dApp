import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(min: number, max: number): number {
  // Ensure MIN is less than or equal to MAX for valid range
  if (min > max) {
    throw new Error('MIN must be less than or equal to MAX');
  }

  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Multiply by the range (max - min + 1) and add min to get the random number within the desired range
  const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

  return randomNumber;
}
