import QuickActionFlights from '@uc/assets/images/quickActionFlight.svg';
import { UcCarousel } from '@uc/libs/shared/ui';
import { IQuickActionResponse } from '@uc/services/network';
import Image from 'next/image';
import styles from './quick-actions.module.scss';

export interface QuickActionsProps {
  onQuickActionClick?: (name: string) => void;
  quickActionData: IQuickActionResponse;
  windowWidth: number;
}

function QuickActions({ onQuickActionClick, quickActionData, windowWidth }: QuickActionsProps) {
  const quickActionHeaders = {
    heading: 'Quick Actions - Flights',
    description: 'Looking to inquire about your bookings? Give these quick links a try.',
  };

  const quickActionSliderWeb = quickActionData && (
    <div className={styles.flight_quick_action_new}>
      <div>
        <div className={styles.flight_quick_action_details_title}>{quickActionHeaders?.heading}</div>
        <p className={styles.flight_quick_action_details_data}>{quickActionHeaders?.description}</p>
        <div className={styles.flight_item}>
          {quickActionData &&
            (quickActionData?.quickActionBanner || [])
              ?.sort((a, b) => a.order - b.order)
              ?.map(quickAction => (
                <div
                  className={styles.quick_action_card}
                  key={quickAction?.id}
                  style={{ backgroundColor: quickAction?.containerColor }}>
                  <div className={styles.quick_action_card_img}>
                    <Image
                      src={quickAction?.actionIcon_web?.data?.attributes?.url}
                      width={quickAction?.actionIcon_web?.data?.attributes?.width}
                      height={quickAction?.actionIcon_web?.data?.attributes?.height}
                      alt={quickAction?.actionIcon_web?.data?.attributes?.name}
                    />
                  </div>
                  <div className={styles.quick_action_card_details}>{quickAction?.actionName}</div>
                </div>
              ))}
        </div>
      </div>
      {windowWidth >= 1001 && (
        <div className={styles.flight_img}>
          <QuickActionFlights />
        </div>
      )}
    </div>
  );

  const quickActionSliderMobileView =
    quickActionData &&
    (quickActionData?.quickActionBanner || [])
      ?.sort((a, b) => a.order - b.order)
      ?.map(quickAction => (
        <div className={styles.quick_action_card_main_mobile} key={quickAction?.id}>
          <div className={styles.quick_action_card_mobile}>
            <div className={styles.quick_action_card_img_mobile}>
              <Image
                src={quickAction?.actionIcon_mobile?.data?.attributes?.url}
                width={quickAction?.actionIcon_mobile?.data?.attributes?.width}
                height={quickAction?.actionIcon_mobile?.data?.attributes?.height}
                alt={quickAction?.actionIcon_mobile?.data?.attributes?.name}
              />
            </div>
            <div className={styles.quick_action_card_details_mobile}>{quickAction?.actionName}</div>
          </div>
        </div>
      ));

  const slidesLength =
    quickActionData && (quickActionData?.quickActionBanner || [])?.length > 3
      ? 3.4
      : (quickActionData?.quickActionBanner || [])?.length;

  const slidesPerViewInfoAction = () => {
    switch (true) {
      case windowWidth <= 350:
        return slidesLength;
      case windowWidth <= 400:
        return slidesLength;
      default:
        return slidesLength;
    }
  };

  return (
    <div className={styles.flight_quick_action_main}>
      {quickActionData && (
        <div className={styles.flight_quick_action}>
          {windowWidth >= 1001 && (
            <UcCarousel slides={[quickActionSliderWeb]} spaceBetween={0} slidesPerView={1} showPagination />
          )}
          {windowWidth <= 1001 && quickActionData && (
            <div className={styles.flight_quick_action_new}>
              <div className={styles.flight_quick_action_details_title}>{quickActionHeaders?.heading}</div>
              <div className={styles.flight_quick_action_details_data}>{quickActionHeaders?.description}</div>
              <UcCarousel
                slides={quickActionSliderMobileView}
                spaceBetween={0}
                slidesPerView={slidesPerViewInfoAction()}
                showPagination
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuickActions;
