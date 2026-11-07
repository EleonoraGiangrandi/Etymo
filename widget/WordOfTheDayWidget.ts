import React from 'react';
import { FlexWidget, TextWidget, ImageWidget } from 'react-native-android-widget';
import { WORDS, getWordOfTheDay } from '../constants/words';

function getStorySnippet(story: string) {
  if (story.length <= 48) return story;
  const trimmed = story.substring(0, 48);
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace > 32) {
    return story.substring(0, lastSpace) + '...';
  }
  return trimmed + '...';
}

export function WordOfTheDayWidget(props?: { wordEntry?: any }) {
  const wordEntry = props?.wordEntry || getWordOfTheDay();
  const storySnippet = getStorySnippet(wordEntry.story);

  return React.createElement(
    FlexWidget,
    {
      clickAction: 'OPEN_URI',
      clickActionData: { uri: 'etymo://?wordId=' + wordEntry.id },
      style: {
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#FDFCF8', // Parchment from the app
        borderRadius: 16,
        paddingTop: 14,
        paddingLeft: 16,
        paddingRight: 24,
        paddingBottom: 8,
        borderWidth: 1.5,
        borderColor: '#E8E4D9', // Border color from the app
      },
    },
    [
      // Left Section: Colossal lens mascot illustration attached to bottom border
      React.createElement(
        FlexWidget,
        {
          key: 'left-section',
          style: {
            width: 108,
            height: 'match_parent',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 18,
          },
        },
        React.createElement(ImageWidget, {
          image: require('../assets/images/lens_widget.png'),
          imageWidth: 104,
          imageHeight: 180,
        })
      ),

      // Right Section: Text details with generous breathing space
      React.createElement(
        FlexWidget,
        {
          key: 'right-section',
          style: {
            flex: 1,
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
        [
          React.createElement(TextWidget, {
            key: 'word-title',
            text: wordEntry.word.toUpperCase(),
            style: {
              fontSize: 19,
              fontFamily: 'serif',
              color: '#322214', // Ink/wood primary color
              fontWeight: 'bold',
            },
          }),
          React.createElement(TextWidget, {
            key: 'word-etymology',
            text: wordEntry.shortEtymology,
            style: {
              fontSize: 12,
              fontFamily: 'serif',
              color: '#D4AF37', // Gold color from the app
              fontStyle: 'italic',
              marginTop: 3,
              marginBottom: 6,
            },
          }),
          React.createElement(TextWidget, {
            key: 'word-story',
            text: storySnippet,
            style: {
              fontSize: 12,
              fontFamily: 'sans-serif',
              color: '#6B5B4E', // textSecondary color from the app
            },
          }),
        ]
      ),
    ]
  );
}
