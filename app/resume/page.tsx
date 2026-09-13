import ResumeClient from './ResumeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Lebenslauf – passwortgeschützt.',
  robots: { follow: false, index: false },
  title: 'Resume',
};

export default function ResumePage() {
  return <ResumeClient />;
}
