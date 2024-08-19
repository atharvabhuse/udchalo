import blogImage from '@uc/assets/images/army_march.png';
import UdChaloLogo from '@uc/assets/images/udchalo_logo.svg';
import Image from 'next/image';
import { UcCarousel } from '@uc/libs/shared/ui';
import { useGetFlightHomePageData } from '@uc/services/network';
import styles from './blogs.module.scss';

interface BlogsData {
  title: string;
  details: string;
  date: string;
  time: string;
  cta: string;
  ctaLink: string;
  image: string;
}

function Blogs() {
  const { data, error, isError, isLoading, isSuccess } = useGetFlightHomePageData();

  const blogSlides = data?.data?.blogsData?.blogsCard.map((blog: BlogsData, index: number) => (
    <div className={styles.ucblog__card} key={`blogs-${index}`}>
      <Image src={blogImage} alt="image not found" className={styles.image_of_blog} />
      <div className={styles.card_main}>
        <div className={styles.card_main_title}>{blog.title}</div>
        <div className={styles.udChaloBlogsCardData}>{blog.details}</div>
        <div>
          <div className={styles.card_main__logo}>
            <UdChaloLogo />
          </div>
          <div className={styles.ucblogsCard}>
            <div>
              <div className={styles.ucblogsCardTime}>{`${blog.date} | ${blog.time}`}</div>
            </div>
            <div className={styles.ucblogsCardReadMore}>{blog.cta}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  const slidesPerViewInfo = () => {
    switch (true) {
      case window.screen.width <= 350:
        return 1;
      case window.screen.width <= 400:
        return 1.15;
      case window.screen.width <= 750:
        return 1.3;
      case window.screen.width <= 1200:
        return 2;
      default:
        return 3;
    }
  };

  return (
    <div>
      {isSuccess && data && (
        <div className={styles.main_ucblog}>
          <div className={styles.ucblog}>
            <div className={styles.ucblog__title}>
              <h4>{data.data.title}</h4>
              <div className={styles.ucblog__title_details}>{data.data.subtitle}</div>
            </div>
            <div className={styles.ucblog__carousel}>
              <UcCarousel slides={blogSlides} spaceBetween={0} slidesPerView={slidesPerViewInfo()} showPagination />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
