'use client';

import { SwipeableDrawer } from '@mui/material';
import { UcButton, UcCarousel } from '@uc/libs/shared/ui';
import { IBankOffers, IBankOffersCard } from '@uc/services/network';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './offers.module.scss';

interface OffersProps {
  offersData: IBankOffers;
  windowWidth: number;
}
function Offers(props: OffersProps) {
  const { offersData, windowWidth } = props;
  const [clickData, setClickData] = useState(0);
  const [offersButton, setOffersButton] = useState<string>('All');
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerData, setDrawerData] = useState<IBankOffersCard | null>(null);

  const addTypeOfOffers = () => {
    const lobSet = new Set(['All']);
    (offersData?.Bankoffercard || [])
      ?.sort((a, b) => a.priority - b.priority)
      ?.forEach(offer => lobSet.add(offer.typeofoffer));
    return Array.from(lobSet);
  };

  const buttonArray = offersData && addTypeOfOffers();
  const drawerOpen = () => setDrawerVisible(true);
  const drawerClose = () => setDrawerVisible(false);

  const offersSlider =
    offersData &&
    (offersData?.Bankoffercard || [])
      ?.filter(offer => {
        if (offersButton === 'All') {
          return offer.typeofoffer !== offersButton;
        }
        return offer.typeofoffer === offersButton;
      })
      ?.map(offer => (
        <div
          className={styles.offers_swiper_view}
          style={{
            backgroundColor: offer?.backgroundColour,
          }}
          key={offer.id}>
          <div className={styles.offers_swiper_image}>
            <div className={styles.offers_imageBox}>
              <Image
                src={
                  windowWidth >= 650
                    ? offer?.logomobile?.data[0]?.attributes?.url
                    : offer?.logodesktop?.data[0]?.attributes?.url
                }
                width={47}
                height={47}
                alt={offer?.logodesktop?.data[0]?.attributes?.name}
              />
            </div>
          </div>
          <div className={styles.offers_data}>
            <div className={styles.offers_details_offers_heading}>{offer?.title}</div>
            <div className={styles.offers_data_details}>{offer?.description}</div>
            {windowWidth >= 650 && <div className={styles.offers_details_basic}>T&C Apply</div>}
          </div>
          {windowWidth <= 650 && <div className={styles.offers_data_details_new}>T&C Apply</div>}
          <div className={styles.offers_right_view}>
            {offer?.couponcode ? (
              <div className={styles.offers_number}>{offer?.couponcode}</div>
            ) : (
              <div className={styles.offers_number_null} />
            )}
            <Link href={offer.cta} className={styles.offers_cta_link} target="_blank">
              {offer?.ctatext}
            </Link>
            <UcButton
              variant="outlined"
              className={styles.offers_cta_button}
              onClick={() => {
                drawerOpen();
                setDrawerData(offer);
              }}>
              {offer?.ctatext}
            </UcButton>
          </div>
        </div>
      ));
  const slidesPerViewInfo = () => {
    if (offersSlider?.length > 1) {
      switch (true) {
        case windowWidth <= 350:
          return 1;
        case windowWidth <= 400:
          return 1.15;
        case windowWidth <= 500:
          return 1.4;
        case windowWidth <= 1300:
          return 1.5;
        default:
          return 2;
      }
    } else if (offersSlider?.length === 1) {
      return 1;
    } else {
      return 0;
    }
  };
  const handleClick = (dataClick: number) => {
    setClickData(dataClick);
  };
  const slidesPerView = slidesPerViewInfo();

  const bulletListOfTnC = (tnc: string) => {
    const dataArray = tnc.split('#');

    return (
      dataArray && (
        <ul className={styles.offers_tnc_ul_list}>
          {(dataArray || [])?.map((item, index) => {
            const uniqueKey = `tnc-${index}`;
            return <li key={uniqueKey}>{item}</li>;
          })}
        </ul>
      )
    );
  };

  return (
    <div className={styles.offers_main}>
      {offersData && (
        <div className={styles.offers_main_data}>
          <div className={styles.offers_head}>Offers</div>
          <div>
            <div className={styles.offers_container_Data}>
              <div className={styles.offers_button_view}>
                {buttonArray &&
                  (buttonArray || [])?.map((buttonData: string, index: number) => (
                    <button
                      type="button"
                      className={`${styles.offers_button} ${index === clickData ? styles.offers_button_active : ''} `}
                      key={`buttonArray-${index}`}
                      onClick={() => {
                        setOffersButton(buttonData);
                        handleClick(index);
                      }}>
                      {buttonData}
                    </button>
                  ))}
              </div>
              {windowWidth >= 1000 && <div className={styles.offers_button_view_all}>View All</div>}
            </div>
          </div>
          <div className={styles.offers_swiper}>
            <UcCarousel slides={offersSlider} spaceBetween={0} slidesPerView={slidesPerView} showPagination />
          </div>
        </div>
      )}
      {drawerData && windowWidth < 650 && (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerVisible}
          onClose={drawerClose}
          onOpen={drawerOpen}
          PaperProps={{
            style: {
              height: '80%',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              overflowY: 'unset',
            },
          }}>
          <div className={styles.offers_drawer_container}>
            <div className={styles.offers_header_container}>
              <div className={styles.offers_header} style={{}}>
                {drawerData?.title}
              </div>
              <button type="button" onClick={drawerClose} className={styles.offers_close_button}>
                x
              </button>
            </div>
            <div className={styles.offers_image_container}>
              <Image
                className={styles.offers_image}
                src={drawerData?.BankImageMobile?.data?.attributes?.url}
                alt={drawerData?.BankImageMobile?.data?.attributes?.name}
                width={drawerData?.BankImageMobile?.data?.attributes?.width}
                height={drawerData?.BankImageMobile?.data?.attributes?.height}
              />
            </div>
            <div className={styles.offers_description} style={{ paddingInline: '10px', fontSize: '12px' }}>
              {drawerData?.description}
            </div>
            <div className={styles.offers_coupon_code_container}>
              Coupon Code: <span className={styles.offers_coupon_code}>{drawerData?.couponcode}</span>
            </div>
            <div className={styles.offers_tnc_container}>
              <div className={styles.offers_tnc_header}>Terms & Condition</div>
              <div className={styles.offers_tnc_list}>{drawerData && bulletListOfTnC(drawerData?.tnc)}</div>
            </div>
          </div>
        </SwipeableDrawer>
      )}
    </div>
  );
}

export default Offers;
