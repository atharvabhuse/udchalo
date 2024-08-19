import type { Metadata } from 'next';
import { FlightsProvider } from '@uc/libs/shared/components/flights-provider';
import { UcFooter, UcHeader } from '@uc/libs/shared/ui';
import 'react-day-picker/dist/style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.min.css';
import '@uc/libs/flights/shared/styles/portals/city-search-dropdown.scss';
import '@uc/libs/flights/shared/styles/portals/tv-select-dropdown.scss';

export const metadata: Metadata = {
  title: 'udChalo - Flight Bookings with Defence Concession Rates',
  description:
    'Book flight ticket with udChalo under the defence quota & avail defence concession rates for Indian Armed Forces, Paramilitary Forces, Veterans & Dependents',
};

export default function FlightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlightsProvider>
      <UcHeader selectedTab={undefined} />
      {children}
      <UcFooter />
    </FlightsProvider>
  );
}
