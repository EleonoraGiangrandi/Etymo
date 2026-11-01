import React from 'react';
import { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { WordOfTheDayWidget } from './WordOfTheDayWidget';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      if (props.widgetInfo.widgetName === 'WordOfTheDay') {
        props.renderWidget(React.createElement(WordOfTheDayWidget));
      }
      break;

    case 'WIDGET_DELETED':
      break;

    case 'WIDGET_CLICK':
      break;
      
    default:
      break;
  }
}
