import {ThemeProvider} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';

import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastRedLake = () => {
  const theme = useSelector(state => state.themeReducer.theme);

  const {colors} = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <NextSevenDaysForecastTemplate
          placeTempLat={43.4471}
          placeTempLong={17.214}
          bgColor={colors.TEMPLATE_BACKGROUND_COLOR}
        />
      </ThemeProvider>
    </>
  );
};
