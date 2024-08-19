'use client';

import UcConfirmation from '@uc/libs/flights/shared/ui/components/confirmation/confirmation';

function Confirmation({ params }: { params: { bookingId: string } }) {
  const bookingId = params?.bookingId || '';
  return bookingId ? <UcConfirmation bookingId={bookingId} /> : <div>No data found</div>;
}

export default Confirmation;
