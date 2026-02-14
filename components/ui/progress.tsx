import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import {
    CORNERS_FULL,
    CORNERS_SM,
    SPACING_XS,
} from '@/theme/globals';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { SPRING_BOUNCY } from '@/theme/globals';

/**
 * Echo Progress Bar
 * 
 * Chunky, animated progress bar with rounded ends.
 * Fills with a satisfying bouncy spring animation.
 * Used for XP progress, daily goals, activity completion.
 */

interface ProgressBarProps {
    progress: number; // 0 to 1
    height?: number;
    color?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    label?: string;
    style?: ViewStyle;
    animated?: boolean;
}

export function ProgressBar({
    progress,
    height = 14,
    color,
    backgroundColor,
    showLabel = false,
    label,
    style,
    animated = true,
}: ProgressBarProps) {
    const primaryColor = useColor('primary');
    const mutedColor = useColor('muted');
    const textMuted = useColor('textMuted');

    const barColor = color || primaryColor;
    const trackColor = backgroundColor || mutedColor;

    const animatedProgress = useSharedValue(0);

    useEffect(() => {
        const clampedProgress = Math.min(1, Math.max(0, progress));
        if (animated) {
            animatedProgress.value = withSpring(clampedProgress, {
                ...SPRING_BOUNCY,
                stiffness: 80,
            });
        } else {
            animatedProgress.value = withTiming(clampedProgress, {
                duration: 0,
            });
        }
    }, [progress, animated]);

    const animatedBarStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value * 100}%`,
    }));

    return (
        <View style={style}>
            {showLabel && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: SPACING_XS,
                    }}
                >
                    <Text variant="caption" bold style={{ fontSize: 12 }}>
                        {label || 'Progress'}
                    </Text>
                    <Text variant="caption" bold style={{ fontSize: 12 }}>
                        {Math.round(progress * 100)}%
                    </Text>
                </View>
            )}
            <View
                style={{
                    height,
                    backgroundColor: trackColor,
                    borderRadius: CORNERS_FULL,
                    overflow: 'hidden',
                    borderCurve: 'continuous',
                }}
            >
                <Animated.View
                    style={[
                        {
                            height: '100%',
                            backgroundColor: barColor,
                            borderRadius: CORNERS_FULL,
                            minWidth: progress > 0 ? height : 0,
                        },
                        animatedBarStyle,
                    ]}
                />
            </View>
        </View>
    );
}

/**
 * Echo XP Progress Bar
 * 
 * Specialized version with XP-specific styling.
 * Shows current XP / target XP with the Echo brand colors.
 */

interface XpProgressProps {
    currentXp: number;
    targetXp: number;
    style?: ViewStyle;
}

export function XpProgress({ currentXp, targetXp, style }: XpProgressProps) {
    const xpColor = useColor('xpGain');

    return (
        <View style={style}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: SPACING_XS,
                    alignItems: 'center',
                }}
            >
                <Text bold style={{ fontSize: 13, color: xpColor }}>
                    ⚡ {currentXp} XP
                </Text>
                <Text variant="tiny">
                    {targetXp - currentXp} to next level
                </Text>
            </View>
            <ProgressBar
                progress={currentXp / targetXp}
                height={12}
                color={xpColor}
            />
        </View>
    );
}
