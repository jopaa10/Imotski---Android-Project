import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastDvaOka = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <NextSevenDaysForecastTemplate
        placeTempLat={'43.4564873'}
        placeTempLong={'17.1749875'}
        bgColor={colors.DVA_OKA_BACKGROUND_COLOR}
      />
    </ThemeProvider>
  );
};
