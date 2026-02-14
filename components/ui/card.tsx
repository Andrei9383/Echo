import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import {
  BORDER_RADIUS,
  BORDER_WIDTH_SM,
  SHADOW_MD,
  SPACING_LG,
  SPACING_SM,
  SPACING_MD,
} from '@/theme/globals';
import { forwardRef } from 'react';
import {
  Pressable,
  type PressableProps,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SPRING_BOUNCY, SPRING_RESPONSIVE } from '@/theme/globals';

/**
 * Echo Card Component
 * 
 * Bubbly, rounded cards with visible borders
 * and subtle shadow — feels like a sticker or game card.
 * Optional bounce animation on press.
 */

interface CardProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animated?: boolean;
}

export const Card = forwardRef<View, CardProps>(
  ({ children, style, animated = false, ...props }, ref) => {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      if (animated) {
        scale.value = withSpring(0.97, SPRING_RESPONSIVE);
      }
    };

    const handlePressOut = () => {
      if (animated) {
        scale.value = withSpring(1, SPRING_BOUNCY);
      }
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const cardStyle: ViewStyle = {
      width: '100%',
      backgroundColor: cardColor,
      borderRadius: BORDER_RADIUS,
      borderWidth: BORDER_WIDTH_SM,
      borderColor: borderColor,
      borderCurve: 'continuous',
      padding: SPACING_LG,
      ...SHADOW_MD,
    };

    if (animated) {
      return (
        <Pressable
          ref={ref}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        >
          <Animated.View style={[cardStyle, animatedStyle, style]}>
            {children}
          </Animated.View>
        </Pressable>
      );
    }

    return (
      <Pressable
        ref={ref}
        {...props}
        style={[cardStyle, style]}
      >
        {children}
      </Pressable>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[{ marginBottom: SPACING_SM }, style]}>{children}</View>;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function CardTitle({ children, style }: CardTitleProps) {
  return (
    <Text
      variant='title'
      style={[
        {
          marginBottom: 4,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return (
    <Text variant='caption' style={[style]}>
      {children}
    </Text>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[style]}>{children}</View>;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
  return (
    <View
      style={[
        {
          marginTop: SPACING_MD,
          flexDirection: 'row',
          gap: SPACING_SM,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
