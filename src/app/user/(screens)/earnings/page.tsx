'use client';

import { Earnings, useUcHeaderContext } from '@uc/libs/shared/ui';
import { useEffect } from 'react';

function EarningsPage() {
  const { setSelectedTab } = useUcHeaderContext();

  useEffect(() => {
    setSelectedTab('UC Earnings');
  }, []);

  return <Earnings />;
}

export default EarningsPage;
