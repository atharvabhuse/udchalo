import { Card, CardActions, CardContent } from '@mui/material';
import { MealImageIcon, NonVegSymbolIcon, SpoonAndForkIcon, UcButton, VegSymbolIcon } from '@uc/libs/shared/ui';
import { groupBy } from 'lodash-es';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './meal-chart.module.scss';

/* eslint-disable-next-line */

export interface IMealOption {
  imgUrl: string | null;
  code: string | null;
  price: number | null;
  text: string | null;
  isNonVeg?: boolean;
}
export interface MealChartProps {
  maxCount: number;
  selectedMeals: IMealOption[];
  mealOptions: IMealOption[];
  onMealSelect: (value: IMealOption) => void;
  onMealDeSelect?: (value: IMealOption) => void;
  mealMessage?: string;
}

export function MealChart(props: MealChartProps) {
  const { maxCount, mealOptions = [], selectedMeals, onMealSelect, onMealDeSelect, mealMessage } = props;
  const [addedMeals, setAddedMeals] = useState<IMealOption[]>(selectedMeals ?? []);

  useEffect(() => setAddedMeals(selectedMeals), [selectedMeals]);

  const addMeal = (addMealOption: IMealOption) => {
    // setAddedMeals([addMealOption]);
    onMealSelect(addMealOption);
  };

  const cancelMeal = (cancelMealOption: IMealOption) => {
    const existingIndex =
      addedMeals && (addedMeals || [])?.findIndex((meal: IMealOption) => meal?.code === cancelMealOption?.code);
    const splicedMeals = addedMeals && (addedMeals || [])?.splice(existingIndex, 1);
    setAddedMeals([...splicedMeals]);
    onMealDeSelect(cancelMealOption);
  };

  const mealGroups = groupBy(addedMeals, 'code');

  return (
    <div className={styles.meal_chart_container}>
      {mealOptions && mealOptions?.length > 0 ? (
        <div className={styles.meal_container}>
          {mealOptions.map((meal: IMealOption) => (
            <Card key={meal.code} variant="outlined" className={styles.meal_card}>
              <CardContent className={styles.content}>
                {meal?.imgUrl ? (
                  <Image src={meal?.imgUrl} alt={meal?.text} className={styles.img_box} width={0} height={0} />
                ) : (
                  <div className={styles.no_img_box}>
                    <SpoonAndForkIcon />
                  </div>
                )}
                <div className={styles.meal_text_container}>
                  <div>{meal?.isNonVeg ? <NonVegSymbolIcon /> : <VegSymbolIcon />}</div>
                  <p className={styles.meal_name}>{meal?.text}</p>
                </div>
              </CardContent>
              <CardActions className={styles.actions}>
                <div className={styles.meal_price_text}>₹ {meal?.price}</div>
                {mealGroups[meal?.code] ? (
                  <div className={styles.step_btn}>
                    <button type="button" onClick={() => cancelMeal(meal)}>
                      -
                    </button>
                    <div>{mealGroups[meal?.code].length}</div>
                    <button type="button" onClick={() => addMeal(meal)}>
                      +
                    </button>
                  </div>
                ) : (
                  <UcButton
                    disableRipple
                    className={styles.add_btn}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => addMeal(meal)}>
                    Add
                  </UcButton>
                )}
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        mealMessage && (
          <div className={styles.no_meal_container}>
            <MealImageIcon />
            <div className={styles.no_meal_message}>{mealMessage}</div>
          </div>
        )
      )}
    </div>
  );
}

export default MealChart;
