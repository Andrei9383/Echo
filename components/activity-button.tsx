import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { Text } from './ui/text';
import { useColor } from '@/hooks/useColor';
import {
  CORNERS,
  BORDER_WIDTH,
  SHADOW_BUTTON,
  SPRING_BOUNCY,
  SPRING_RESPONSIVE,
} from '@/theme/globals';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

/**
 * Echo Activity Button
 * 
 * Big chunky tappable cards for selecting activity categories.
 * Duolingo-style with emoji, bold labels, colored accents,
 * and satisfying bouncy press animations.
 */

interface ActivityButtonProps {
  children?: React.ReactNode;
  label?: string;
  emoji?: string;
  color?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function ActivityButton({
  children,
  label,
  emoji,
  color,
  style,
  onPress,
}: ActivityButtonProps) {
  const cardColor = useColor('card');
  const borderColor = useColor('border');
  const textColor = useColor('text');

  const accentColor = color || borderColor;
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, SPRING_RESPONSIVE);
    translateY.value = withSpring(3, SPRING_RESPONSIVE);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SPRING_BOUNCY);
    translateY.value = withSpring(0, SPRING_BOUNCY);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          {
            width: 160,
            height: 110,
            borderRadius: CORNERS + 4,
            borderCurve: 'continuous',
            backgroundColor: accentColor + '18',
            borderWidth: BORDER_WIDTH,
            borderColor: accentColor + '60',
            borderBottomWidth: BORDER_WIDTH + 2,
            borderBottomColor: accentColor + '90',
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
          },
          animatedStyle,
          style,
        ]}
      >
        {emoji && (
          <Text style={{ fontSize: 28 }}>{emoji}</Text>
        )}
        {label && (
          <Text
            bold
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: textColor,
              textAlign: 'center',
              lineHeight: 16,
            }}
          >
            {label}
          </Text>
        )}
        {children}
      </Animated.View>
    </Pressable>
  );
}
