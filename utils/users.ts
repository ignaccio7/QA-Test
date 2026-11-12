import { randomUUID } from 'node:crypto';

export interface TestUser {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  phone: string;
  email: string;
  password: string;
}

export function generateTestUser(candidateEmail: string = process.env.CANDIDATE_EMAIL || 'nestor.rojas@gmail.com'): TestUser {
  const uniqueId = randomUUID().slice(0, 8);
  const [localPart, domain] = candidateEmail.split('@');

  if (!localPart || !domain) {
    throw new Error('CANDIDATE_EMAIL no tiene un formato válido');
  }

  return {
    firstName: `Test${uniqueId}`,
    lastName: 'Automation',
    dob: '1998-05-15',
    country: 'BO',
    postalCode: '0000',
    houseNumber: '45',
    phone: '70012345',
    email: `${localPart}+${uniqueId}@${domain}`,
    password: `Test${uniqueId}!Aa1@`,
  };
}
