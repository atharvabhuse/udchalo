import RightArrow from '@uc/assets/images/right_arrow.svg';
import styles from './change-in-plans-option.module.scss';

/* eslint-disable-next-line */
export interface ChangeInPlansOptionProps {
  heading: string;
  desc: string;
  color: string;
  onOptionSelect: (action: string) => void;
}

function ChangeInPlansOption(props: ChangeInPlansOptionProps) {
  const { heading, desc, color, onOptionSelect } = props;
  const onPlanChangeClick = () => {
    onOptionSelect(heading.toLowerCase());
  };
  const borderColor = { borderLeft: `4px solid ${color}` };
  return (
    <div className={styles.changeInPlansOption} onClick={onPlanChangeClick}>
      <div className={styles.changeInPlans_content} style={borderColor}>
        <div className={styles.changeInPlansOption_heading}>{heading}</div>
        <div className={styles.changeInPlansOption_desc}>{desc}</div>
      </div>
      <RightArrow />
    </div>
  );
}

export default ChangeInPlansOption;
