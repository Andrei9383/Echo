import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import {
    CORNERS,
    BORDER_WIDTH_SM,
    SHADOW_SM,
    SPACING_MD,
    SPACING_SM,
} from '@/theme/globals';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SPRING_BOUNCY, SPRING_RESPONSIVE } from '@/theme/globals';
import { Pressable } from 'react-native';

/**
 * Echo Stat Card
 * 
 * Compact card for displaying a single statistic.
 * Used in dashboard grids — shows emoji, value, and label.
 * Bouncy press animation for interactivity.
 */

interface StatCardProps {
    emoji: string;
    value: string | number;
    label: string;
    color?: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export function StatCard({
    emoji,
    value,
    label,
    color,
    onPress,
    style,
}: StatCardProps) {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const primaryColor = useColor('primary');

    const accentColor = color || primaryColor;
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.95, SPRING_RESPONSIVE);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, SPRING_BOUNCY);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
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
                        backgroundColor: cardColor,
                        borderRadius: CORNERS,
                        borderWidth: BORDER_WIDTH_SM,
                        borderColor: borderColor,
                        borderCurve: 'continuous',
                        padding: SPACING_MD,
                        alignItems: 'center',
                        gap: 4,
                        minWidth: 100,
                        ...SHADOW_SM,
                    },
                    animatedStyle,
                    style,
                ]}
            >
                <Text style={{ fontSize: 24 }}>{emoji}</Text>
                <Text
                    variant="title"
                    style={{
                        color: accentColor,
                        fontSize: 24,
                    }}
                >
                    {value}
                </Text>
                <Text variant="caption" style={{ fontSize: 11, textAlign: 'center' }}>
                    {label}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
