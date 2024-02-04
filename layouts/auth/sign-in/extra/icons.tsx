import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const ArrowForwardIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='arrow-forward-outline'/>
);

export const GoogleIcon = (props: any): IconElement => (
  <Icon {...props} name='google'/>
);

export const FacebookIcon = (props: any): IconElement => (
  <Icon {...props} name='facebook'/>
);

export const TwitterIcon = (props: any): IconElement => (
  <Icon {...props} name='twitter'/>
);

