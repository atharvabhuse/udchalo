/* eslint-disable @typescript-eslint/no-misused-promises */
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, InputAdornment, OutlinedInput } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DiscountPercentage from '@uc/assets/images/discount_icon.svg';
import { DiscountCouponCard, FaujiFamilyCouponImage, MSiteUcHeader } from '@uc/libs/shared/ui';
import { ICoupon } from '@uc/services/network';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './uc-discount-coupon.module.scss';
import { IAppliedCoupon } from '@uc/libs/flights/trip-summary/flights-trip-summary-reducer';

export interface AppliedCoupon {
  isValid?: boolean;
  coupon: ICoupon | null;
}

export interface UcDiscountCouponProps {
  couponsList: ICoupon[];
  validateCoupon: (data: ICoupon) => Promise<void>;
  appliedCoupon: IAppliedCoupon;
  removeCoupon: (data: ICoupon | null) => void;
  isCouponRemovable?: boolean;
}

export function UcDiscountCoupon({
  couponsList,
  validateCoupon,
  appliedCoupon,
  removeCoupon,
  isCouponRemovable,
}: UcDiscountCouponProps) {
  const classes = {
    checkIcon: {
      backgroundColor: '#00b00c',
      color: 'white',
      borderRadius: '50%',
      padding: '0.2rem',
      width: '14px',
      height: '14px',
    },
    closeIcon: {
      backgroundColor: 'lightgray',
      color: 'white',
      borderRadius: '50%',
      padding: '0.2rem',
    },
  };

  const [appliedCouponDetails, setAppliedCouponDetails] = useState<AppliedCoupon>({ coupon: null });
  const [couponInput, setCouponInput] = useState('');
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [couponApplyLoading, setCouponApplyLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [couponIndex, setCouponIndex] = useState<number>(null);
  const [viewAll, setViewAll] = useState(2);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (couponsList && couponsList?.length > 0) {
      setViewAll(couponsList.length / 2);
    }
  }, [couponsList]);

  const applyValidatedCouponHandler = () => {
    if (appliedCoupon && appliedCoupon?.isValid) {
      setAppliedCouponDetails(prevState => ({
        ...prevState,
        coupon: appliedCoupon?.coupon,
      }));
      setCouponApplyLoading(prevstate => ({
        ...prevstate,
        loading: false,
      }));
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    }

    if (couponIndex !== null && appliedCoupon?.isValid === false) {
      setCouponApplyLoading(prevstate => ({
        ...prevstate,
        loading: false,
      }));
    }

    if (couponIndex !== null) {
      setCouponApplyLoading(prevstate => ({
        ...prevstate,
        [couponIndex]: false,
      }));
      setCouponIndex(null);
    }
  };

  useEffect(() => {
    applyValidatedCouponHandler();
  }, [appliedCoupon]);

  const closeCouponHandler = () => {
    removeCoupon(appliedCoupon?.coupon);
    setAppliedCouponDetails(prevState => ({
      ...prevState,
      coupon: null,
    }));
  };

  const inputCouponChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponInput(e.target.value);
    setInvalidCoupon(false);
  };

  const appliedCouponHandler = async (data: ICoupon, index: number) => {
    setCouponApplyLoading(prevstate => ({
      ...prevstate,
      [index]: true,
    }));
    setCouponIndex(index);
    await validateCoupon(data);
  };

  const inputCouponApplyHandler = async () => {
    setCouponApplyLoading(prevstate => ({
      ...prevstate,
      loading: true,
    }));

    const inputCouponIndex =
      couponsList &&
      (couponsList || [])?.findIndex(
        data => data?.code?.toLocaleLowerCase() === couponInput.toLocaleLowerCase() && data?.isApplicable === true
      );

    if (inputCouponIndex !== -1) {
      const inputFieldAndListCouponMatch = couponsList[inputCouponIndex];
      setCouponIndex(inputCouponIndex);
      await validateCoupon(inputFieldAndListCouponMatch);
      setCouponInput('');
    } else {
      setInvalidCoupon(true);
      setCouponApplyLoading(prevstate => ({
        ...prevstate,
        loading: false,
      }));
    }
  };

  const viewAllHandler = () => {
    if (viewAll !== couponsList?.length) {
      setViewAll(couponsList.length);
    } else {
      setViewAll(couponsList.length / 2);
    }
  };

  const openCouponDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeCouponDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {appliedCouponDetails?.coupon ? (
        <div className={styles.uc_discount_applied_coupon}>
          <div className={styles.discount_coupon_applied_heading_row}>
            <DiscountPercentage />
            <div className={styles.coupon_heading}>Applied Coupon</div>
          </div>
          <div className={styles.code_applied}>
            <div className={styles.code_applied_left}>
              <CheckIcon sx={classes.checkIcon} />
              <div className={styles.code_applied_discount}>
                {`Code ${appliedCouponDetails?.coupon?.code} Applied!`}
              </div>
              <div className={styles.code_applied_discount_rupees}>
                - ₹{appliedCouponDetails?.coupon?.discountAmount}
              </div>
            </div>
            {isCouponRemovable && (
              <CloseIcon sx={classes.closeIcon} className={styles.closeIconBox} onClick={closeCouponHandler} />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.uc_discount_coupon}>
          <div className={styles.discount_coupon_heading_row}>
            <DiscountPercentage />
            <div>
              <div className={styles.coupon_heading}>Discount Coupons</div>
              <div className={styles.discount_coupon_desc}>Apply coupon to get extra discount!</div>
            </div>
          </div>

          {couponsList &&
            (couponsList || [])?.slice(0, viewAll)?.map((coupon, index: number) => {
              const uniqueKey = `couponList-${index}`;
              return (
                <DiscountCouponCard
                  coupon_details={coupon}
                  applyCouponHandler={async data => {
                    await appliedCouponHandler(data, index);
                  }}
                  key={uniqueKey}
                  isCouponApplyLoading={couponApplyLoading[index]}
                />
              );
            })}

          <p className={styles.viewAll_row}>
            <button type="button" className={styles.viewAll_text} onClick={viewAllHandler}>
              {viewAll !== couponsList?.length ? 'View All' : 'View Less'}
            </button>
            <button type="button" className={styles.viewall_text_msite} onClick={openCouponDrawer}>
              View All
            </button>
          </p>
          <div className={styles.coupon_input_row}>
            <OutlinedInput
              type="text"
              className={styles.coupon_input}
              onChange={inputCouponChangeHandler}
              placeholder="Enter Coupon Code"
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '11px 16px',
                  paddingRight: '0px',
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  {couponApplyLoading.loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <button
                      type="submit"
                      disabled={!couponInput}
                      onClick={inputCouponApplyHandler}
                      className={couponInput ? styles.apply_btn : styles.apply_btn_disabled}>
                      Apply
                    </button>
                  )}
                </InputAdornment>
              }
            />
          </div>
          {invalidCoupon && <div className={styles.invalid_coupon}>Please enter valid Coupon code</div>}
        </div>
      )}
      {isDrawerOpen && (
        <Drawer
          anchor="bottom"
          PaperProps={{
            style: {
              height: '100%',
              width: '100%',
              backgroundColor: '#E5EDF4',
            },
          }}
          open={isDrawerOpen}
          onClose={closeCouponDrawer}>
          <div className={styles.discount_container_msite}>
            <MSiteUcHeader backHandler={() => closeCouponDrawer()}>
              <MSiteUcHeader.LeftContent>Discount Coupons</MSiteUcHeader.LeftContent>
            </MSiteUcHeader>
            <div className={styles.image_container}>
              <FaujiFamilyCouponImage />
            </div>
            <div className={styles.coupon_card_list_container}>
              <OutlinedInput
                type="text"
                className={styles.coupon_input}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '11px 16px',
                    paddingRight: '0px',
                  },
                }}
                onChange={inputCouponChangeHandler}
                placeholder="Enter Coupon Code"
                endAdornment={
                  <InputAdornment position="end">
                    {couponApplyLoading.loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <button
                        type="submit"
                        disabled={!couponInput}
                        onClick={inputCouponApplyHandler}
                        className={couponInput ? styles.apply_btn : styles.apply_btn_disabled}>
                        Apply
                      </button>
                    )}
                  </InputAdornment>
                }
              />
              {invalidCoupon && <div className={styles.invalid_coupon}>Please enter valid Coupon code</div>}

              {couponsList &&
                (couponsList || [])?.map((coupon, index: number) => {
                  const uniqueKey = `couponListDrawer-${index}`;
                  return (
                    <DiscountCouponCard
                      coupon_details={coupon}
                      applyCouponHandler={async data => {
                        await appliedCouponHandler(data, index);
                      }}
                      key={uniqueKey}
                      isCouponApplyLoading={couponApplyLoading[index]}
                    />
                  );
                })}
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
}

export default UcDiscountCoupon;
