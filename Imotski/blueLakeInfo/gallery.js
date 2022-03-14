import React from 'react';

//overview template
import {TemplateInfo} from '../infoTemplate';

//gallery template
import GalleryTemplate from '../galleryTemplate';
import {useTheme} from 'styled-components';

export const Gallery = () => {
  const {colors} = useTheme();

  return (
    <>
      <TemplateInfo
        image={require('../images/blueLakeArticle.jpg')}
        city={'Imotski'}
        sight={'Blue Lake'}
        title={'Blue Lake'}
        color={'grey'}
        color2={colors.PRIMARY_TEXT_COLOR}
        color3={'grey'}
        gallery={
          <GalleryTemplate
            image1={require('../images/blueLakeArticle.jpg')}
            image2={require('../images/blueLake.jpg')}
            image3={require('../images/blueLakeH.jpg')}
            image4={require('../images/blueLakeArticle.jpg')}
            image5={require('../images/blueLake.jpg')}
            image6={require('../images/blueLakeH.jpg')}
          />
        }
      />
    </>
  );
};
