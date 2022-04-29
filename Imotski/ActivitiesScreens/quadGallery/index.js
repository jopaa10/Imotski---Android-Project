import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const QuadGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/quadActivity.jpg')}
      city={'Imotski'}
      navigate={'Overview'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Green Lake'}
      title={'Tour by Quad'}
      details={
        <GalleryTemplate
          image1={require('../../images/quadActivity.jpg')}
          image2={require('../../images/quad/quadAdv.jpg')}
          image3={require('../../images/quad/quadAdv1.jpg')}
          image4={require('../../images/quad/quadAdv2.jpg')}
          image5={require('../../images/quad/quadAdv3.jpg')}
          image6={require('../../images/quad/quadAdv4.jpg')}
        />
      }
    />
  );
};
