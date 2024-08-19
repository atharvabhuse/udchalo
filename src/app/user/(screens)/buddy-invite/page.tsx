'use client';

import { BuddyInvite, useUcHeaderContext } from '@uc/libs/shared/ui';
import React, { useEffect } from 'react';

function BuddyInvitePage() {
  const { setSelectedTab } = useUcHeaderContext();

  useEffect(() => {
    setSelectedTab('Buddy Invite');
  }, []);

  return <BuddyInvite />;
}

export default BuddyInvitePage;
