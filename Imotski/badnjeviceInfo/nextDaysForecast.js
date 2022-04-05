import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {NextSevenDaysForecastTemplate} from '../nextSevenDaysTempTemplate/nextSevenDaysTemp';

export const NextDaysForecastBadnjevice = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const {colors} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <NextSevenDaysForecastTemplate
        placeTempLat={'43.4828'}
        placeTempLong={'17.1547'}
        bgColor={colors.BADNJEVICE_BACKGROUND_COLOR}
      />
    </ThemeProvider>
  );
};
