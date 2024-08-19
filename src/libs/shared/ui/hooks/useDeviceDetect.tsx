import { useEffect, useState } from 'react';

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    }
  }, []);

  return { isMobile };
}
