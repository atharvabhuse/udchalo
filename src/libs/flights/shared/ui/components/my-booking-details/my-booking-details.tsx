/* import {
  AddInsurance,
  BaggageDetails,
  BannerWithicon,
  BookedContactDetails,
  BookedTravellerDetails,
  ChangeInPlans,
  UcCard,
  UcFareBreakup,
  WebCheckIn,
} from '@uc/shared/ui';
import styles from './my-booking-details.module.css';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import copy from 'copy-to-clipboard';
import UcPromo from 'libs/shared/ui/components/uc-promo/uc-promo';
import Percentage from '@uc/assets/images/percentage_icon.svg';
import Phone from '@uc/assets/images/confirmation_page_phone.svg';
import Whatsapp from '@uc/assets/images/confirmation_page_whatsapp.svg';
import Email from '@uc/assets/images/confirmation_page_email.svg';
import Linkedin from '@uc/assets/images/confirmation_page_linkedin.svg';
import Instagram from '@uc/assets/images/confirmation_page_instagram.svg';
import Twitter from '@uc/assets/images/confirmation_page_twitter.svg';
import Facebook from '@uc/assets/images/confirmation_page_facebook.svg';
import Youtube from '@uc/assets/images/confirmation_page_youtube.svg';
import GooglePlay from '@uc/assets/images/googlePlay_icon.svg';
import AppStore from '@uc/assets/images/appStore_icon.svg';

import UcSupport from 'libs/shared/ui/components/uc-support/uc-support';
import UcFollowUsAndDownload from 'libs/shared/ui/components/uc-follow-us-and-download/uc-follow-us-and-download';
import { Checkbox, FormControlLabel } from '@mui/material';
import UcCTABanner from 'libs/shared/ui/components/uc-ctabanner/uc-ctabanner';
import ExtrasCard from '../extras-card/extras-card';

export interface MyBookingDetailsPropTypes {
  pnr?: string;
}

const MyBookingDetails = (props: MyBookingDetailsPropTypes) => {
  const openExtras = (index: number) => {};

  const holiday = [
    {
      header: 'Heading to Thiruvananthapuram',
      subHeader:
        'Get 20% off on booking hotels with udChalo grab the deal now!',
      ctaLink: 'Book Hotels',
      link: 'https://www.udchalo.com/udchaloHolidays',
      backgroundImage: '/assets/images/thiruvananthapuram.svg',
    },
  ];

  const contactOptions = [
    {
      icon: <Phone />,
      contactHeading: '+91 9272203030',
      link: 'tel:+919272203030',
    },
    {
      icon: <Whatsapp />,
      contactHeading: '+91 8408833030',
      link: 'https://wa.me/8408833030',
    },
    {
      icon: <Email />,
      contactHeading: 'customercare@udchalo.com',
      link: 'mailto:customercare@udchalo.com',
    },
  ];

  const followusIcon = [
    {
      icon: <Linkedin />,
      link: 'https://www.linkedin.com/company/udchalo/',
    },
    {
      icon: <Instagram />,
      link: 'https://www.instagram.com/udchalo_official/',
    },
    {
      icon: <Twitter />,
      link: 'https://www.twitter.com/udchalo',
    },
    {
      icon: <Facebook />,
      link: 'https://www.facebook.com/udchalo',
    },
    {
      icon: <Youtube />,
      link: 'https://www.youtube.com/channel/UCa2XfSNuWwE5ryqLPp48t7w',
    },
  ];

  const downloadUdChaloApp = [
    {
      icon: <GooglePlay />,
      link: 'https://play.google.com/store/apps/details?id=app.udChalo.flights&ah=wIu69aquTqbCHd50dPhX-lfg_M0&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
    },
    {
      icon: <AppStore />,
      link: 'https://apps.apple.com/in/app/udchalo/id1454639734',
    },
  ];

  const extras = [
    {
      heading: 'Seat',
      desc: 'Book seat of your choice before boarding',
    },
    {
      heading: 'Meal',
      desc: 'Pre-select your meal at the best rates',
    },
    {
      heading: 'Excess Baggage',
      desc: 'Book your additional baggage at minimal cost',
    },
  ];

  const onCopyToClipBoard = () => {
    copy(props.pnr);
  };

  const review = {
    baseFare: 10000,
    taxesAndFees:
      730,
    conveienceFees:
      600,
  };
  const discount = {
    name: 'BOBFLIGHT',
    price: 2000
  };
  const discountCode = 'BOBFLIGHT';
  const discountAmount = 1200;

  const downloadTicketHandler = () => {};

  const fareHandler = () => {};

  return (
    <div>
      <div className={styles.my_bookings_root}>
        <div className={styles.left_pane}>
          <div className={styles.box}>
            <div className={styles.pnr_box}>
              <span className={styles.pnr}>PNR : {props.pnr}</span>
              <div className={styles.copy_icon} onClick={onCopyToClipBoard}>
                <ContentCopyOutlinedIcon
                  className={styles.icon}></ContentCopyOutlinedIcon>
              </div>
            </div>
            <div>
              <span className={styles.status}> Confirmed</span>
              <div className={styles.type}>
                <span>Defence</span>
              </div>
            </div>
          </div>

          <div id="tripSummary" className={styles.trip_summary}></div>

          <div id="travellerDetails" className={styles.traveller_details}>
				<BookedTravellerDetails/>
			 </div>

          <div id="baggageDetails" className={styles.baggage_details}>
			<BaggageDetails/>
			 </div>

          <div id="bookedContactDetails" className={styles.contact_details}>
            <BookedContactDetails />
          </div>

          <div id="suraksha" className={styles.suraksha}>
            <BannerWithicon
              bannerType="suraksha"
              heading=" Your trip is now covered under suraksha"
            />
          </div>

          <div id="extras" className={styles.extras}>
            <div className={styles.heading}>Add Extra</div>
            <div className={styles.sub_heading}>
              Make your journey hasle free by adding Seats, Meals and Baggage
            </div>
            {extras.map((data, index: number) => (
              <ExtrasCard
                details={data}
                key={index}
                openPopupCallback={() => openExtras(index)}
              />
            ))}
          </div>
          <div id="addInsurance">
            <AddInsurance />
          </div>
          <div id="holidayBanner" className={styles.holiday_banner}>
            <UcCTABanner holiday={holiday} />
          </div>
        </div>
        <div className={styles.right_pane}>
          <div className={styles.web_checkin}>
            <WebCheckIn
              pnr={props.pnr}
              heading={'Web Check-In is Open Now'}
              desc={
                'Web check-in is mandatory and free. Counter check-in will attract extra charges.'
              }
            />
          </div>
          <div className={styles.change_in_plan}>
            <ChangeInPlans
              heading={'Change in plans?'}
              desc={
                'No worries! You can change the time and or date of your flight or cancel and process your refund with udChalo.'
              }></ChangeInPlans>
          </div>
          <div>
            <UcFareBreakup
              review={review}
              discount={discount}
              fareChangeCallback={fareHandler}
              seatFees={undefined}
              totalFare={undefined}
            />
          </div>
          <UcPromo
            icon={<Percentage />}
            heading={`UDCJUST4YOU promo applied`}
            desc={`You have saved ₹${1096} on this booking`}
          />
          <div className={styles.promo_button_container}>
            <button
              className={styles.ticket_button}
              onClick={downloadTicketHandler}>
              Download Ticket
            </button>
          </div>

          <UcSupport
            contactOptions={contactOptions}
            header={'For general queries, you can contact us on'}
          />

          <UcFollowUsAndDownload
            heading={'Follow us on'}
            icons={followusIcon}
          />
          <UcFollowUsAndDownload
            heading={'Download udChalo App on'}
            icons={downloadUdChaloApp}
          />
        </div>
      </div>
    </div>
  );
};
export default MyBookingDetails;
 */
