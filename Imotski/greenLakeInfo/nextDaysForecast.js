import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastGreenLake = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <NextSevenDaysForecastTemplate
        placeTempLat={'43.5035'}
        placeTempLong={'17.1256'}
        bgColor={colors.GREEN_LAKE_BACKGROUND_COLOR}
      />
    </ThemeProvider>
  );
};
