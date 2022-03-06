import {ThemeProvider} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastRedLake = () => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NextSevenDaysForecastTemplate
          placeTempLat={43.4471}
          placeTempLong={17.214}
          bgColor={theme.TEMPLATE_BACKGROUND_COLOR}
        />
      </ThemeProvider>
    </>
  );
};
