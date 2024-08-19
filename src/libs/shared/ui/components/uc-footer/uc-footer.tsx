import {
  FacebookFooterIcon,
  TwitterFooterIcon,
  YoutubeFooterIcon,
  LinkedinFooterIcon,
  InstagramFooterIcon,
  TwitterX,
  QRCode,
  Tourism,
  Rera,
  StartUpIndia,
  GooglePlayUpdated,
  AppStoreUpdated,
  HeartIcon,
  CopyRightIcon,
} from '@uc/libs/shared/ui';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExapndMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './uc-footer.module.scss';

/* eslint-disable-next-line */
export interface UcFooterProps {}

export function UcFooter(props: UcFooterProps) {
  // Defining the data object for footer content
  const footerContent = [
    { heading: 'Travel', link: 'https://www.udchalo.com/' },
    {
      heading: 'Shopping',
      link: 'https://www.udchalo.com/defense/shopping',
    },
    { heading: 'Finance', link: 'https://www.udchalo.com/itrFiling' },
    { heading: 'Housing', link: 'https://www.udchalo.com/housing' },

    { heading: 'Company', link: '' },
    { heading: 'About Us', link: 'https://www.corporate.udchalo.com/' },
    {
      heading: 'Leadership',
      link: 'https://www.corporate.udchalo.com/theteam',
    },
    { heading: 'Booking Offices', link: 'https://www.udchalo.com/locations' },
    { heading: 'Blogs', link: 'https://stories.udchalo.com/' },
    {
      heading: 'Terms of Use',
      link: 'https://www.udchalo.com/policies/terms-of-use',
    },
    {
      heading: 'Privacy policy',
      link: 'https://www.udchalo.com/policies/privacy-policy',
    },
    { heading: 'Important Links', link: '' },
    { heading: 'Contact Us', link: 'https://www.udchalo.com/contactus' },
    { heading: 'FAQ', link: 'https://support.udchalo.com/support/home' },
    { heading: 'LTC Claim', link: '' },
    {
      heading: 'Forever Fauji',
      link: 'https://static.udchalo.com/ForeverFauji/index.html',
    },
    { heading: 'Opportunities', link: '' },
    {
      heading: 'जुड़Chalo',
      link: 'https://static.udchalo.com/ForeverFauji/index.html',
    },
    {
      heading: '#FamilyForLife',
      link: 'https://static.udchalo.com/ForeverFauji/index.html',
    },
    {
      heading: 'Carrers',
      link: 'https://www.corporate.udchalo.com/udchalo-careers',
    },
    { heading: 'Partner with Us', link: 'https://www.udchalo.com/franchise' },
  ];

  const socialMediaIconClickHandler = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.footer_section1} />

        <div className={styles.footer_section2}>
          {/* Row of Important Links only for Desktop view */}
          <div className={styles.footer_section2_row}>
            {footerContent.slice(0, 4).map((data, index: number) => (
              <a key={`footerContent1-${index}`} href={data.link}>
                {data.heading}
              </a>
            ))}
          </div>

          {/* Row of Important Links only for Desktop view */}
          <div className={styles.footer_section2_row}>
            {footerContent.slice(4, 11).map((data, index: number) =>
              index === 0 ? (
                <a
                  key={`footerContent2-${index}`}
                  className={styles.row_color_white}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              ) : (
                <a
                  key={`footerContent3-${index}`}
                  className={styles.row_color_gray}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              )
            )}
          </div>

          {/* Row of Important Links only for Desktop view */}
          <div className={styles.footer_section2_row}>
            {footerContent.slice(11, 16).map((data, index: number) =>
              index === 0 ? (
                <a
                  key={`footerContent4-${index}`}
                  className={styles.row_color_white}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              ) : (
                <a
                  key={`footerContent5-${index}`}
                  className={styles.row_color_gray}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              )
            )}
          </div>

          {/* Row of Important Links only for Desktop view */}
          <div className={styles.footer_section2_row}>
            {footerContent.slice(16, 21).map((data, index: number) =>
              index === 0 ? (
                <a
                  key={`footerContent6-${index}`}
                  className={styles.row_color_white}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              ) : (
                <a
                  key={`footerContent7-${index}`}
                  className={styles.row_color_gray}
                  href={data.link}
                  target="_blank"
                  rel="noreferrer">
                  {data.heading}
                </a>
              )
            )}
          </div>

          {/* Accordion of Important Links only for Mobile view */}
          <div className={styles.accordionBox}>
            <Accordion className={styles.accordion}>
              <AccordionSummary expandIcon={<ExapndMoreIcon className={styles.accordionIcon} />}>
                {footerContent.slice(4, 11)[0].heading}
              </AccordionSummary>
              <AccordionDetails>
                {footerContent.slice(5, 11).map((data, index: number) => (
                  <a
                    key={`footerContent8-${index}`}
                    className={styles.accordion_desc}
                    href={data.link}
                    target="_blank"
                    rel="noreferrer">
                    {data.heading}
                  </a>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Accordion of Important Links only for Mobile view */}
          <div className={styles.accordionBox}>
            <Accordion className={styles.accordion}>
              <AccordionSummary expandIcon={<ExapndMoreIcon className={styles.accordionIcon} />}>
                {footerContent.slice(11, 16)[0].heading}
              </AccordionSummary>
              <AccordionDetails>
                {footerContent.slice(12, 16).map((data, index: number) => (
                  <a
                    key={`footerContent9-${index}`}
                    className={styles.accordion_desc}
                    href={data.link}
                    target="_blank"
                    rel="noreferrer">
                    {data.heading}
                  </a>
                ))}{' '}
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Accordion of Important Links only for Mobile view */}
          <div className={styles.accordionBox}>
            <Accordion className={styles.accordion}>
              <AccordionSummary expandIcon={<ExapndMoreIcon className={styles.accordionIcon} />}>
                {footerContent.slice(16, 21)[0].heading}
              </AccordionSummary>
              <AccordionDetails>
                {footerContent.slice(17, 21).map((data, index: number) => (
                  <a
                    key={`footerContent10-${index}`}
                    className={styles.accordion_desc}
                    href={data.link}
                    target="_blank"
                    rel="noreferrer">
                    {data.heading}
                  </a>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        {/* Download and Share section */}
        <div className={styles.footer_section3}>
          <p>Download udChalo App</p>
          <div className={styles.footer_section3_row1}>
            <div className={styles.google_play_box}>
              <GooglePlayUpdated
                className={styles.image}
                onClick={() =>
                  socialMediaIconClickHandler(
                    'https://play.google.com/store/apps/details?id=app.udChalo.flights&ah=wIu69aquTqbCHd50dPhX-lfg_M0&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pli=1'
                  )
                }
              />
            </div>
            <div className={styles.google_play_box}>
              <AppStoreUpdated
                className={styles.image}
                onClick={() =>
                  socialMediaIconClickHandler(
                    'https://apps.apple.com/in/app/udchalo-super-app-for-soldiers/id1454639734'
                  )
                }
              />
            </div>
          </div>
          <div className={styles.footer_section3_row2}>
            <div>
              <FacebookFooterIcon
                className={styles.icon}
                onClick={() => socialMediaIconClickHandler('https://www.facebook.com/udchalo')}
              />
            </div>
            <div>
              <TwitterX
                className={styles.icon}
                onClick={() => socialMediaIconClickHandler('https://www.twitter.com/udchalo')}
              />
            </div>
            <div>
              <YoutubeFooterIcon
                className={styles.icon}
                onClick={() => socialMediaIconClickHandler('https://www.youtube.com/channel/UCa2XfSNuWwE5ryqLPp48t7w')}
              />
            </div>
            <div>
              <LinkedinFooterIcon
                className={styles.icon}
                onClick={() => socialMediaIconClickHandler('https://www.linkedin.com/company/udchalo/')}
              />
            </div>
            <div>
              <InstagramFooterIcon
                className={styles.icon}
                onClick={() => socialMediaIconClickHandler('https://www.instagram.com/udchalo_official/')}
              />
            </div>
          </div>
        </div>

        {/* QR code only for Desktop view */}
        <div className={styles.footer_section4}>
          <div className={styles.qrcode_img_box}><QRCode /></div>
          <p className={styles.qrcode_desc}>Scan this QR code to download App</p>
        </div>

        <div className={styles.footer_section1} />
      </div>

      {/* Company branding footer */}
      <div className={styles.footer2}>
        <div className={styles.footer_section1}> </div>
        <div className={styles.footer2_section2}>
          <p className={styles.footer2_section2_text}>Made with <HeartIcon /> in Pune, India. 2023</p>
          <p className={styles.footer2_section2_text}><CopyRightIcon /> 2023 Upcurve Consumer Technologies Pvt. Ltd.</p>
        </div>
        <div className={styles.footer_section3}> </div>
        <div className={styles.footer_section4}>
          <Tourism />
          <StartUpIndia />
          <Rera />
        </div>
        <div className={styles.footer_section1} />
      </div>
    </div>
  );
}

export default UcFooter;
