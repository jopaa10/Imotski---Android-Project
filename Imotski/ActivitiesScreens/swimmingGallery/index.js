import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const SwimmingGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/swimBlueLake.jpg')}
      city={'Imotski'}
      navigate={'Overview'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Blue Lake'}
      title={'Swimming in Lake'}
      details={
        <GalleryTemplate
          image1={require('../../images/swimBlueLake.jpg')}
          image2={require('../../images/swimmingInBL/swimm.jpg')}
          image3={require('../../images/swimmingInBL/swimm1.jpg')}
          image4={require('../../images/swimmingInBL/swimm2.jpg')}
          image5={require('../../images/swimmingInBL/swimm3.jpg')}
          image6={require('../../images/swimmingInBL/swimm4.jpg')}
        />
      }
    />
  );
};
