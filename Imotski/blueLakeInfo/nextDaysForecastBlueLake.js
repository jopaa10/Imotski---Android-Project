import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastBlueLake = () => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <NextSevenDaysForecastTemplate
        placeTempLat={'43.4506'}
        placeTempLong={'17.21'}
        bgColor={theme.PRIMARY_BACKGROUND_COLOR}
      />
    </ThemeProvider>
  );
};
