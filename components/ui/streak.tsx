import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { CORNERS_SM, SPACING_XS, SPACING_SM, FONT_SIZE_XS } from '@/theme/globals';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { SPRING_BOUNCY } from '@/theme/globals';
import { getStreak, StreakData } from '@/activities/activities';

/**
 * Echo Streak Counter
 * 
 * Duolingo-style streak display with fire emoji and
 * animated day dots. Shows the user's consecutive tracking days.
 */

interface StreakCounterProps {
  streakData: StreakData[],
  style?: ViewStyle;
}

export function StreakCounter({ streakData, style }: StreakCounterProps) {
  const activeColor = useColor('streakActive');
  const inactiveColor = useColor('streakInactive');
  const cardColor = useColor('card');
  const borderColor = useColor('border');

  // const defaultDays = days || Array(7).fill(false).map((_, i) => i < count % 7 || count >= 7);
  const streak = streakData || getStreak(new Date());
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  console.log("streak data in streak : ", streak);

  return (
    <View
      style={[
        {
          // backgroundColor: cardColor,
          // borderRadius: 20,
          // borderWidth: 2,
          // borderColor: borderColor,
          padding: 20,
          alignItems: 'center',
          borderCurve: 'continuous',
        },
        style,
      ]}
    >
      {/* Streak number */}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}> */}
      {/*     <Text style={{ fontSize: 28 }}>🔥</Text> */}
      {/*     <Text */}
      {/*         variant="display" */}
      {/*         style={{ color: activeColor, fontSize: 38 }} */}
      {/*     > */}
      {/*         {count} */}
      {/*     </Text> */}
      {/* </View> */}
      {/* <Text variant="label" style={{ marginBottom: 16, color: activeColor }}> */}
      {/*     DAY STREAK */}
      {/* </Text> */}

      {/* Day dots */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {streak.map((data, i) => (
          <StreakDot
            key={i}
            active={data.activity}
            label={dayLabels[data.day]}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            delay={i * 60}
          />
        ))}
      </View>
    </View>
  );
}

interface StreakDotProps {
  active: boolean;
  label: string;
  activeColor: string;
  inactiveColor: string;
  delay: number;
}

function StreakDot({ active, label, activeColor, inactiveColor, delay }: StreakDotProps) {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, SPRING_BOUNCY)
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 200 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ alignItems: 'center', gap: 4 }, animatedStyle]}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: active ? activeColor : inactiveColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {active && (
          <Text style={{ fontSize: 14 }}>✓</Text>
        )}
      </View>
      <Text
        bold
        style={{
          fontSize: FONT_SIZE_XS,
          color: active ? activeColor : inactiveColor,
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
}
