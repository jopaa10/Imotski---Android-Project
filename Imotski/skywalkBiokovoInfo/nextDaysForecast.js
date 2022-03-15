import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastSkywalk = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <NextSevenDaysForecastTemplate
        placeTempLat={'43.2854'}
        placeTempLong={'17.0848'}
        bgColor={colors.PRIMARY_BACKGROUND_COLOR}
      />
    </ThemeProvider>
  );
};
