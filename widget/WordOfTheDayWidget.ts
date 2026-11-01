import React from 'react';
import { FlexWidget, TextWidget, ImageWidget } from 'react-native-android-widget';
import { WORDS } from '../constants/words';

// Deterministic selection of the word of the day based on the calendar date
function getWordOfTheDay() {
  const today = new Date();
  const dateHash = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
  const index = dateHash % WORDS.length;
  return WORDS[index];
}

function getStorySnippet(story: string) {
  if (story.length <= 95) return story;
  const trimmed = story.substring(0, 95);
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace > 75) {
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
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 20,
        paddingBottom: 0,
        borderWidth: 1.5,
        borderColor: '#E8E4D9', // Border color from the app
      },
    },
    [
      // Left Section: Image container
      React.createElement(
        FlexWidget,
        {
          key: 'left-section',
          style: {
            width: 130,
            height: 170,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 12,
          },
        },
        React.createElement(ImageWidget, {
          image: require('../assets/images/lens.png'),
          imageWidth: 130,
          imageHeight: 170,
        })
      ),

      // Right Section: Text details
      React.createElement(
        FlexWidget,
        {
          key: 'right-section',
          style: {
            flex: 1,
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: 12,
          },
        },
        [
          React.createElement(TextWidget, {
            key: 'word-title',
            text: wordEntry.word.toUpperCase(),
            style: {
              fontSize: 18,
              fontFamily: 'serif',
              color: '#322214', // Ink/wood primary color
              fontWeight: 'bold',
            },
          }),
          React.createElement(TextWidget, {
            key: 'word-etymology',
            text: wordEntry.shortEtymology,
            style: {
              fontSize: 11,
              fontFamily: 'serif',
              color: '#D4AF37', // Gold color from the app
              fontStyle: 'italic',
              marginTop: 2,
              marginBottom: 4,
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
