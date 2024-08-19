'use client';

import { useUcHeaderContext } from '@uc/libs/shared/ui';
import MyProfile from '@uc/libs/shared/ui/components/my-profile/my-profile';
import { useEffect } from 'react';

function MyProfilePage() {
  const { setSelectedTab } = useUcHeaderContext();

  useEffect(() => {
    setSelectedTab('My Profile');
  }, []);

  return <MyProfile handleSubModuleChange={setSelectedTab} />;
}

export default MyProfilePage;
