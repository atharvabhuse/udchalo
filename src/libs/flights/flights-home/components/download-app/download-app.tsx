// import AppStore from '@uc/assets/images/appStore.svg';
// import GooglePlay from '@uc/assets/images/googlePlay.svg';
// import DownloadQr from '@uc/assets/images/downloadQr.svg';
import DownloadQr from '@uc/assets/images/downloadQrNew.png';
import AppStore from '@uc/assets/images/appStoreNew.png';
import GooglePlay from '@uc/assets/images/googlePlayNew.png';
import Image from 'next/image';
import { useGetFlightHomePageData } from '@uc/services/network';
import styles from './download-app.module.scss';

function DownloadApp() {
  const { data, error, isError, isLoading, isSuccess } = useGetFlightHomePageData();

  return (
    <div className={styles.download_app_body}>
      {isSuccess && (
        <div className={styles.download_app_details}>
          <div className={styles.download_app_details_info}>
            <div>
              <div className={styles.download_app_info_heading}>{data?.data?.appDownloadInfo?.heading}</div>
              <div className={styles.download_app_info_heading_data}>{data?.data?.appDownloadInfo?.details}</div>
            </div>
            <div className={styles.download_app_info_heading_details}>{data?.data?.appDownloadInfo?.detailsData}</div>
            <div>
              <div className={styles.download_app_info_download_data}>{data?.data?.appDownloadInfo?.appDownload}</div>
              <div className={styles.download_store}>
                {/* <AppStore />
              <GooglePlay /> */}
                <Image src={AppStore} width={112} height={34} alt="Baroda" />
                <Image src={GooglePlay} width={112} height={34} alt="Baroda" />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.app_download_QR}>
              <div className={styles.download_Qr}>
                {/* <DownloadQr /> */}
                <Image src={DownloadQr} width={100} height={130} alt="Baroda" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadApp;
