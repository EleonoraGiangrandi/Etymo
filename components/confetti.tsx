import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COUNT = 40;
const COLORS = ['#D4AF37', '#FFD700', '#F0E68C', '#B8860B', '#CFB53B'];

const ConfettiPiece = ({ index }: { index: number }) => {
  const translateY = useSharedValue(-SCREEN_HEIGHT * 0.1);
  const translateX = useSharedValue(Math.random() * SCREEN_WIDTH);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(Math.random() * 0.5 + 0.5);
  
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = Math.random() * 10 + 5;
  const duration = Math.random() * 2000 + 2000;
  const delay = Math.random() * 1000;

  useEffect(() => {
    translateY.value = withDelay(delay, withRepeat(
      withTiming(SCREEN_HEIGHT + 20, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1, // Infinite repeat
      false // Do not reverse
    ));

    rotate.value = withDelay(delay, withRepeat(withTiming(360, {
      duration: Math.random() * 1000 + 1000,
      easing: Easing.linear,
    }), -1, false));

    translateX.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(translateX.value + (Math.random() * 40 - 20), { duration: 1000 }),
        withTiming(translateX.value - (Math.random() * 40 - 20), { duration: 1000 })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View 
      style={[
        styles.confetti, 
        { width: size, height: size * 1.2 }, 
        animatedStyle
      ]} 
    />
  );
};

export const Confetti = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {[...Array(CONFETTI_COUNT)].map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 2,
  },
});
