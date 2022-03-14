import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme,

  mode: 'dark',

  colors: {
    ...DarkTheme.colors,
    background: 'black',
    PRIMARY_BACKGROUND_COLOR: '#0F0F0F',
    SECUNDARY_BACKGROUND_COLOR: '#3E3E3E',
    PRIMARY_TEXT_COLOR: '#ffffff',
    PRIMARY_BUTTON_COLOR: '#23a8d9',
    PRIMARY_BUTTON_TEXT_COLOR: '#ffffff',
    STATUS_BAR_STYLE: 'light-content',
    FONTAWESOME_ICON_COLOR: '#fff',
    TEMPLATE_BACKGROUND_COLOR: '#000',
    DIRECTION_ICON_COLOR: '#fff',
    MODAL_BACKGROUND_COLOR: '#000',
  },
};

export const lightTheme = {
  ...DefaultTheme,

  mode: 'light',

  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    PRIMARY_BACKGROUND_COLOR: '#1F83BB',
    SECUNDARY_BACKGROUND_COLOR: 'white',
    PRIMARY_TEXT_COLOR: '#212121',
    PRIMARY_BUTTON_COLOR: '#8022d9',
    PRIMARY_BUTTON_TEXT_COLOR: '#ffffff',
    STATUS_BAR_STYLE: 'default',
    FONTAWESOME_ICON_COLOR: '#000',
    TEMPLATE_BACKGROUND_COLOR: '#CA9A8C',
    DIRECTION_ICON_COLOR: 'blue',
    MODAL_BACKGROUND_COLOR: '#fff',
  },
};
