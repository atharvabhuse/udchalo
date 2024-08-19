import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import styles from './route-navigation.module.scss';
import { useUcHeaderContext } from '../../contexts/uc-header.context';
/* eslint-disable-next-line */
export interface RouteNavigationProps {
  selectedTab?: string;
}

export function RouteNavigation(props: RouteNavigationProps) {
  const params = useParams();
  const sessionId = (params?.sessionId as string) || '';
  const onwardId = (params?.onwardId as string) || '';
  const returnId = (params?.returnId as string) || '';
  const adults = (params?.adults as string) || '';

  const { selectedTab, setSelectedTab } = useUcHeaderContext();

  const router = useRouter();
  const pathname = usePathname() || '';
  const [breadcrumb, setBreadCrumb] = useState('');
  const [breadcrumbLevel2, setBreadCrumbLevel2] = useState('');
  const [breadcrumbLevel1, setBreadCrumbLevel1] = useState('');

  useEffect(() => {
    setBreadCrumbLevel2((selectedTab as string) || '');
  }, [router]);
  useEffect(() => {
    if (pathname.includes('web-check-in')) {
      setBreadCrumb('Web Check-in');
      setBreadCrumbLevel1('');
    } else if (pathname.includes('results')) {
      setBreadCrumb('Search Results');
      setSelectedTab('');
    } else if (pathname.includes('review')) {
      setBreadCrumb('Trip Summary');
    } else if (pathname.includes('trip-summary')) {
      setBreadCrumb('Your Trip Summary');
      setBreadCrumbLevel1('');
    } else if (
      pathname.includes('modify-flight') ||
      pathname.includes('bookings') ||
      pathname.includes('booking-details')
    ) {
      setBreadCrumb('My Booking');
      setBreadCrumbLevel1('');
    } else if (pathname.includes('reschedule-trip')) {
      setBreadCrumbLevel1('Reschedule Booking');
      setBreadCrumb('My Booking');
    }
  }, [router]);

  return (
    <div className={styles.route_navigation}>
      <div className={styles.navigation_link}>
        <Link href="/flights">Home</Link>
      </div>
      {breadcrumb && breadcrumb === 'My Booking' && (
        <>
          <div className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </div>
          <div className={styles.breadcrum_level1}>
            <Link href="/user/bookings">{breadcrumb}</Link>
          </div>
          <div className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </div>
          <div className={styles.breadcrum_level1}>
            <Link href="/user/bookings">{selectedTab}</Link>
          </div>
        </>
      )}
      {breadcrumb && breadcrumb === 'Search Results' && (
        <>
          <div className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </div>
          <div className={styles.breadcrum_level1}>
            {breadcrumb && <Link href={`/flights/results/${String(sessionId)}`}>{breadcrumb}</Link>}
          </div>
        </>
      )}

      {breadcrumb && breadcrumb === 'Trip Summary' && (
        <>
          <div className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </div>
          <div className={styles.breadcrum_level1}>
            {breadcrumb && <Link href={`/flights/results/${String(sessionId)}`}>Search result</Link>}
          </div>
          <div className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </div>
          <div className={styles.breadcrum_level1}>
            {breadcrumb && (
              <Link href={`/flights/review/${String(sessionId)}?onwardId=${String(onwardId)}&returnId=${String(returnId)}&adults=${Number(adults)}`}>
                {breadcrumb}
              </Link>
            )}
          </div>
        </>
      )}

      {breadcrumbLevel1 && (
        <div>
          <span className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </span>
          <span className={styles.breadcrum_level2}>{breadcrumbLevel1}</span>
        </div>
      )}
      {breadcrumbLevel2 && (
        <div>
          <span className={styles.navigation_arrow}>
            <ChevronRightOutlinedIcon />
          </span>
          <span className={styles.breadcrum_level2}>{breadcrumbLevel2}</span>
        </div>
      )}
    </div>
  );
}

export default RouteNavigation;
