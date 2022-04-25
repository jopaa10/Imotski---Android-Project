import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const GlumciGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/glumciUZagvozdu.jpg')}
      city={'Zagvozd'}
      navigate={'Entertainment Screen'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={''}
      title={'Glumci U Zagvozdu'}
      details={
        <GalleryTemplate
          image1={require('../../images/glumciUZagvozdu.jpg')}
          image2={require('../../images/glumciUZagvozdu/glumciUZagvozdu.jpg')}
          image3={require('../../images/glumciUZagvozdu/glumciUZagvozdu1.jpg')}
          image4={require('../../images/glumciUZagvozdu/glumciUZagvozdu2.jpg')}
          image5={require('../../images/glumciUZagvozdu/glumciUZagvozdu3.jpg')}
          image6={require('../../images/glumciUZagvozdu/glumciUZagvozdu4.jpg')}
        />
      }
    />
  );
};
