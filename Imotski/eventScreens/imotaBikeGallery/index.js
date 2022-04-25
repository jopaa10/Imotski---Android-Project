import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const ImotaBikeGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/imotaBikeAndWine.jpeg')}
      city={'Imotski'}
      navigate={'Entertainment Screen'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Imotski region'}
      title={'Imota Bike & Wine'}
      details={
        <GalleryTemplate
          image1={require('../../images/imotaBikeAndWine.jpeg')}
          image2={require('../../images/imotaBike/imotaBike.jpg')}
          image3={require('../../images/imotaBike/imotaBike1.jpg')}
          image4={require('../../images/imotaBike/imotaBike2.jpg')}
          image5={require('../../images/imotaBike/imotaBike3.jpg')}
          image6={require('../../images/imotaBike/imotaBike4.jpg')}
        />
      }
    />
  );
};
