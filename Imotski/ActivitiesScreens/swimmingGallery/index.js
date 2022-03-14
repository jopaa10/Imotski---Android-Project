import React from 'react';
import {useTheme} from 'styled-components';
import {ActivitiesInfoTemplate} from '../../ActivitiesInfoTemplate';
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
          image1={require('../../images/blueLakeArticle.jpg')}
          image2={require('../../images/blueLake.jpg')}
          image3={require('../../images/blueLakeH.jpg')}
          image4={require('../../images/blueLakeArticle.jpg')}
          image5={require('../../images/blueLake.jpg')}
          image6={require('../../images/blueLakeH.jpg')}
        />
      }
    />
  );
};
