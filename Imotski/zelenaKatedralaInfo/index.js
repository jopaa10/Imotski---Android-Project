import React from 'react';
import {useTheme} from 'styled-components';
//template
import {TemplateInfo} from '../infoTemplate';

const GreenCathedralInfo = ({route}) => {
  const {colors} = useTheme();

  return (
    <TemplateInfo
      image={route.params.image}
      id={route.params.id}
      city={'Prolozac'}
      sight={'Green Cathedral'}
      title={'Green Cathedral - History'}
      details={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
      color={colors.PRIMARY_TEXT_COLOR}
      color2={'grey'}
      color3={'grey'}
      navigateBack={'Explore Prolozac'}
    />
  );
};

GreenCathedralInfo.sharedElements = ({route}) => {
  //const {item} = route.params;
  //console.log(route.params.id);
  return [
    {
      id: route.params.id,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default GreenCathedralInfo;
