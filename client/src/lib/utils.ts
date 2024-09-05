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

export const getWalletAddressFromWindow = async () => {
  if (window.ethereum) {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((response) => {
        if (Array.isArray(response) && response.length > 0) {
          return response[0];
        }
      })
      .catch((error: any) => {
        console.error('Error requesting Ethereum accounts:', error);
      });
  }
};

export function convertDateToDDMMYYYY(dateString: string | Date): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
