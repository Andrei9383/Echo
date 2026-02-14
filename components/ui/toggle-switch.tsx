import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useColor } from '@/hooks/useColor';
import { CORNERS_FULL, BORDER_WIDTH_SM } from '@/theme/globals';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';
import { SPRING_BOUNCY, SPRING_RESPONSIVE } from '@/theme/globals';
import { useEffect } from 'react';

/**
 * Echo Toggle Switch
 * 
 * Bubbly, animated toggle with smooth color transition.
 * The thumb bounces into position with spring physics.
 */

interface ToggleSwitchProps {
    value: boolean;
    onValueChange?: (val: boolean) => void;
    activeColor?: string;
    style?: ViewStyle;
    disabled?: boolean;
}

export function ToggleSwitch({
    value,
    onValueChange,
    activeColor,
    style,
    disabled = false,
}: ToggleSwitchProps) {
    const primaryColor = useColor('primary');
    const mutedColor = useColor('muted');
    const cardColor = useColor('card');
    const borderColor = useColor('border');

    const fillColor = activeColor || primaryColor;
    const progress = useSharedValue(value ? 1 : 0);
    const scale = useSharedValue(1);

    const TRACK_WIDTH = 52;
    const TRACK_HEIGHT = 30;
    const THUMB_SIZE = 24;
    const PADDING = 3;

    useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, SPRING_BOUNCY);
    }, [value]);

    const handlePress = () => {
        if (!disabled) {
            onValueChange?.(!value);
        }
    };

    const handlePressIn = () => {
        scale.value = withSpring(0.9, SPRING_RESPONSIVE);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, SPRING_BOUNCY);
    };

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [mutedColor, fillColor],
        ),
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX:
                    progress.value * (TRACK_WIDTH - THUMB_SIZE - PADDING * 2),
            },
        ],
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: disabled ? 0.5 : 1,
    }));

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
        >
            <Animated.View style={[containerStyle, style]}>
                <Animated.View
                    style={[
                        {
                            width: TRACK_WIDTH,
                            height: TRACK_HEIGHT,
                            borderRadius: CORNERS_FULL,
                            padding: PADDING,
                            justifyContent: 'center',
                            borderWidth: BORDER_WIDTH_SM,
                            borderColor: borderColor,
                        },
                        trackStyle,
                    ]}
                >
                    <Animated.View
                        style={[
                            {
                                width: THUMB_SIZE,
                                height: THUMB_SIZE,
                                borderRadius: THUMB_SIZE / 2,
                                backgroundColor: cardColor,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 3,
                                elevation: 3,
                            },
                            thumbStyle,
                        ]}
                    />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}
