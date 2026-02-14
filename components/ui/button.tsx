import { Icon } from '@/components/ui/icon';
import { ButtonSpinner, SpinnerVariant } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import {
  CORNERS,
  FONT_SIZE,
  HEIGHT,
  HEIGHT_SM,
  HEIGHT_LG,
  BORDER_WIDTH,
  SPRING_BOUNCY,
  SPRING_RESPONSIVE,
} from '@/theme/globals';
import * as Haptics from 'expo-haptics';
import { LucideProps } from 'lucide-react-native';
import { forwardRef } from 'react';
import {
  Pressable,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

/**
 * Echo Button Component
 * 
 * Duolingo-inspired chunky 3D buttons.
 * Default buttons have a bold bottom shadow/border that
 * compresses on press — feels like pushing a real button.
 * Everything bounces with spring animations.
 */

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'success'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'accent';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  children?: React.ReactNode;
  animation?: boolean;
  haptic?: boolean;
  icon?: React.ComponentType<LucideProps>;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingVariant?: SpinnerVariant;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      icon,
      onPress,
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      animation = true,
      haptic = true,
      loadingVariant = 'default',
      style,
      textStyle,
      ...props
    },
    ref
  ) => {
    const primaryColor = useColor('primary');
    const primaryForegroundColor = useColor('primaryForeground');
    const secondaryColor = useColor('secondary');
    const secondaryForegroundColor = useColor('secondaryForeground');
    const accentColor = useColor('accent');
    const accentForegroundColor = useColor('accentForeground');
    const destructiveColor = useColor('destructive');
    const destructiveForegroundColor = useColor('destructiveForeground');
    const successColor = useColor('success');
    const borderColor = useColor('border');
    const textColor = useColor('text');

    // Bouncy animation values
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);

    const getButtonStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        borderRadius: CORNERS,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'continuous',
      };

      // Size variants — chunky sizes
      switch (size) {
        case 'sm':
          Object.assign(baseStyle, {
            height: HEIGHT_SM,
            paddingHorizontal: 20,
            borderRadius: CORNERS - 2,
          });
          break;
        case 'lg':
          Object.assign(baseStyle, {
            height: HEIGHT_LG,
            paddingHorizontal: 36,
            borderRadius: CORNERS + 2,
          });
          break;
        case 'icon':
          Object.assign(baseStyle, {
            height: HEIGHT,
            width: HEIGHT,
            paddingHorizontal: 0,
          });
          break;
        default:
          Object.assign(baseStyle, {
            height: HEIGHT,
            paddingHorizontal: 28,
          });
      }

      // Variant styles — Duolingo-style with bold bottom borders
      switch (variant) {
        case 'destructive':
          return {
            ...baseStyle,
            backgroundColor: destructiveColor,
            borderBottomWidth: BORDER_WIDTH + 1,
            borderBottomColor: darkenColor(destructiveColor, 0.25),
          };
        case 'success':
          return {
            ...baseStyle,
            backgroundColor: successColor,
            borderBottomWidth: BORDER_WIDTH + 1,
            borderBottomColor: darkenColor(successColor, 0.25),
          };
        case 'accent':
          return {
            ...baseStyle,
            backgroundColor: accentColor,
            borderBottomWidth: BORDER_WIDTH + 1,
            borderBottomColor: darkenColor(accentColor, 0.25),
          };
        case 'outline':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderWidth: BORDER_WIDTH,
            borderColor: borderColor,
          };
        case 'secondary':
          return {
            ...baseStyle,
            backgroundColor: secondaryColor,
            borderBottomWidth: BORDER_WIDTH,
            borderBottomColor: darkenColor(secondaryColor, 0.15),
          };
        case 'ghost':
          return { ...baseStyle, backgroundColor: 'transparent' };
        case 'link':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            height: 'auto',
            paddingHorizontal: 0,
          };
        default:
          return {
            ...baseStyle,
            backgroundColor: primaryColor,
            borderBottomWidth: BORDER_WIDTH + 1,
            borderBottomColor: darkenColor(primaryColor, 0.3),
          };
      }
    };

    const getButtonTextStyle = (): TextStyle => {
      const baseTextStyle: TextStyle = {
        fontSize: size === 'sm' ? FONT_SIZE - 1 : size === 'lg' ? FONT_SIZE + 1 : FONT_SIZE,
        fontWeight: '700',
        letterSpacing: 0.3,
      };

      switch (variant) {
        case 'destructive':
          return { ...baseTextStyle, color: destructiveForegroundColor };
        case 'success':
          return { ...baseTextStyle, color: '#ffffff' };
        case 'accent':
          return { ...baseTextStyle, color: accentForegroundColor };
        case 'outline':
          return { ...baseTextStyle, color: textColor };
        case 'secondary':
          return { ...baseTextStyle, color: secondaryForegroundColor };
        case 'ghost':
          return { ...baseTextStyle, color: primaryColor };
        case 'link':
          return {
            ...baseTextStyle,
            color: primaryColor,
            textDecorationLine: 'underline',
          };
        default:
          return { ...baseTextStyle, color: primaryForegroundColor };
      }
    };

    const getColor = (): string => {
      switch (variant) {
        case 'destructive':
          return destructiveForegroundColor;
        case 'success':
          return '#ffffff';
        case 'accent':
          return accentForegroundColor;
        case 'outline':
          return textColor;
        case 'secondary':
          return secondaryForegroundColor;
        case 'ghost':
          return primaryColor;
        case 'link':
          return primaryColor;
        default:
          return primaryForegroundColor;
      }
    };

    const getIconSize = (): number => {
      switch (size) {
        case 'sm':
          return 16;
        case 'lg':
          return 24;
        case 'icon':
          return 22;
        default:
          return 20;
      }
    };

    const triggerHapticFeedback = () => {
      if (haptic && !disabled && !loading) {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    };

    // Bouncy press-in — scale down + shift down (3D button press feel)
    const handlePressIn = (ev?: any) => {
      triggerHapticFeedback();

      scale.value = withSpring(0.96, SPRING_RESPONSIVE);
      translateY.value = withSpring(2, SPRING_RESPONSIVE);

      props.onPressIn?.(ev);
    };

    // Bouncy press-out — spring back up
    const handlePressOut = (ev?: any) => {
      scale.value = withSpring(1, SPRING_BOUNCY);
      translateY.value = withSpring(0, SPRING_BOUNCY);

      props.onPressOut?.(ev);
    };

    const handlePress = () => {
      if (onPress && !disabled && !loading) {
        onPress();
      }
    };

    const handleTouchablePress = () => {
      triggerHapticFeedback();
      handlePress();
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: scale.value },
          { translateY: translateY.value },
        ],
        opacity: disabled ? 0.5 : 1,
      };
    });

    const getFlexFromStyle = () => {
      if (!style) return null;
      const styleArray = Array.isArray(style) ? style : [style];
      for (let i = styleArray.length - 1; i >= 0; i--) {
        const s = styleArray[i];
        if (s && typeof s === 'object' && 'flex' in s) {
          return s.flex;
        }
      }
      return null;
    };

    const getPressableStyle = (): ViewStyle => {
      const flexValue = getFlexFromStyle();
      return flexValue === 1
        ? { flex: 1, alignSelf: 'stretch' }
        : flexValue !== null
          ? {
            flex: flexValue,
            maxHeight: size === 'sm' ? HEIGHT_SM : size === 'lg' ? HEIGHT_LG : HEIGHT,
          }
          : {};
    };

    const getStyleWithoutFlex = () => {
      if (!style) return style;
      const styleArray = Array.isArray(style) ? style : [style];
      return styleArray.map((s) => {
        if (s && typeof s === 'object' && 'flex' in s) {
          const { flex, ...restStyle } = s;
          return restStyle;
        }
        return s;
      });
    };

    const buttonStyle = getButtonStyle();
    const finalTextStyle = getButtonTextStyle();
    const contentColor = getColor();
    const iconSize = getIconSize();
    const styleWithoutFlex = getStyleWithoutFlex();

    return animation ? (
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={getPressableStyle()}
        {...props}
      >
        <Animated.View style={[animatedStyle, buttonStyle, styleWithoutFlex]}>
          {loading ? (
            <ButtonSpinner
              size={size}
              variant={loadingVariant}
              color={contentColor}
            />
          ) : typeof children === 'string' ? (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              {icon && (
                <Icon name={icon} color={contentColor} size={iconSize} />
              )}
              <Text style={[finalTextStyle, textStyle]}>{children}</Text>
            </View>
          ) : (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              {icon && (
                <Icon name={icon} color={contentColor} size={iconSize} />
              )}
              {children}
            </View>
          )}
        </Animated.View>
      </Pressable>
    ) : (
      <TouchableOpacity
        ref={ref}
        style={[buttonStyle, disabled && { opacity: 0.5 }, styleWithoutFlex]}
        onPress={handleTouchablePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ButtonSpinner
            size={size}
            variant={loadingVariant}
            color={contentColor}
          />
        ) : typeof children === 'string' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {icon && <Icon name={icon} color={contentColor} size={iconSize} />}
            <Text style={[finalTextStyle, textStyle]}>{children}</Text>
          </View>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

// ─── Utility ────────────────────────────────────────────────
// Simple color darkening for the 3D bottom border effect
function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
