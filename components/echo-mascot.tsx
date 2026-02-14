import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { Image } from 'expo-image';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { SPRING_GENTLE } from '@/theme/globals';

/**
 * Echo Mascot Component
 * 
 * Displays the Echo bat mascot with cute idle animations.
 * Gently floats up and down, and can show speech bubbles.
 */

interface EchoMascotProps {
    size?: number;
    message?: string;
    mood?: 'happy' | 'sleepy' | 'excited' | 'thinking';
    style?: ViewStyle;
    animated?: boolean;
}

export function EchoMascot({
    size = 120,
    message,
    mood = 'happy',
    style,
    animated = true,
}: EchoMascotProps) {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const primaryColor = useColor('primary');

    // Floating animation
    const translateY = useSharedValue(0);
    const rotate = useSharedValue(0);
    const wingScale = useSharedValue(1);

    useEffect(() => {
        if (!animated) return;

        // Gentle floating
        translateY.value = withRepeat(
            withSequence(
                withTiming(-8, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            true,
        );

        // Subtle tilt
        rotate.value = withRepeat(
            withSequence(
                withTiming(-2, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
                withTiming(2, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            true,
        );
    }, [animated]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
        ],
    }));

    const getMoodEmoji = () => {
        switch (mood) {
            case 'sleepy': return '😴';
            case 'excited': return '🎉';
            case 'thinking': return '🤔';
            default: return '';
        }
    };

    return (
        <View style={[{ alignItems: 'center', gap: 12 }, style]}>
            {/* Speech bubble */}
            {message && (
                <View
                    style={{
                        backgroundColor: cardColor,
                        borderRadius: 16,
                        borderWidth: 2,
                        borderColor: borderColor,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        maxWidth: 240,
                        borderCurve: 'continuous',
                        marginBottom: -4,
                    }}
                >
                    <Text
                        bold
                        style={{
                            fontSize: 14,
                            textAlign: 'center',
                            lineHeight: 20,
                        }}
                    >
                        {message}
                    </Text>
                    {/* Speech bubble arrow */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -8,
                            alignSelf: 'center',
                            left: '45%',
                            width: 0,
                            height: 0,
                            borderLeftWidth: 8,
                            borderRightWidth: 8,
                            borderTopWidth: 8,
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderTopColor: borderColor,
                        }}
                    />
                </View>
            )}

            {/* Mascot image */}
            <Animated.View style={animated ? animatedStyle : undefined}>
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={{
                        width: size,
                        height: size,
                    }}
                    contentFit="contain"
                />
            </Animated.View>
        </View>
    );
}
