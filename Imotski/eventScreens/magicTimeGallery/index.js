import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const MagicTimeVinylGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/magicVinylFestival.jpg')}
      city={'Imotski'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Perinusa'}
      navigate={'Entertainment Screen'}
      title={'Magic Time Vinyl Festival'}
      details={
        <GalleryTemplate
          image1={require('../../images/magicVinylFestival.jpg')}
          image2={require('../../images/magicTime/magicTime.jpg')}
          image3={require('../../images/magicTime/magicTime1.jpg')}
          image4={require('../../images/magicTime/magicTime2.jpg')}
          image5={require('../../images/magicTime/magicTime3.jpg')}
          image6={require('../../images/magicTime/magicTime4.jpg')}
        />
      }
    />
  );
};
