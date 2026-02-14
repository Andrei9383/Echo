import React from 'react';
import { View, ViewStyle, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import {
    CORNERS_SM,
    CORNERS,
    BORDER_WIDTH_SM,
    SPACING_SM,
    SPACING_XS,
} from '@/theme/globals';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SPRING_BOUNCY, SPRING_RESPONSIVE } from '@/theme/globals';

/**
 * Echo Chip Component
 * 
 * Small, rounded, tappable chip/tag.
 * Used for categories, filters, activity labels.
 * Bouncy press animation with color-coding support.
 */

interface ChipProps {
    label: string;
    emoji?: string;
    color?: string;
    selected?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
    size?: 'sm' | 'md';
}

export function Chip({
    label,
    emoji,
    color,
    selected = false,
    onPress,
    style,
    size = 'md',
}: ChipProps) {
    const primaryColor = useColor('primary');
    const primaryFgColor = useColor('primaryForeground');
    const borderColor = useColor('border');
    const cardColor = useColor('card');
    const textColor = useColor('text');

    const chipColor = color || primaryColor;
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.93, SPRING_RESPONSIVE);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, SPRING_BOUNCY);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const paddingH = size === 'sm' ? 10 : 14;
    const paddingV = size === 'sm' ? 5 : 8;
    const fontSize = size === 'sm' ? 12 : 14;

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        paddingHorizontal: paddingH,
                        paddingVertical: paddingV,
                        borderRadius: CORNERS,
                        borderCurve: 'continuous',
                        backgroundColor: selected ? chipColor + '25' : cardColor,
                        borderWidth: BORDER_WIDTH_SM,
                        borderColor: selected ? chipColor : borderColor,
                    },
                    animatedStyle,
                    style,
                ]}
            >
                {emoji && <Text style={{ fontSize: fontSize + 2 }}>{emoji}</Text>}
                <Text
                    bold={selected}
                    style={{
                        fontSize,
                        color: selected ? chipColor : textColor,
                        fontWeight: selected ? '700' : '500',
                    }}
                >
                    {label}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
