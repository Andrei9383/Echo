import React from 'react';
import { View, ViewStyle, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { useColor } from '@/hooks/useColor';
import {
    CORNERS,
    BORDER_WIDTH_SM,
    SHADOW_SM,
    SPACING_MD,
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
 * Echo Time Slot Card
 * 
 * Represents a 30-minute time interval.
 * Shows the time range, activity (if logged), or
 * a prompt to log. Has a colored left accent strip.
 */

interface TimeSlotProps {
    timeLabel: string;        // e.g. "14:00 - 14:30"
    activity?: string;        // e.g. "Deep Work (Focus)"
    categoryColor?: string;   // accent strip color
    categoryEmoji?: string;   // emoji for category
    isCurrent?: boolean;      // is this the active interval?
    isEmpty?: boolean;        // no activity logged
    onPress?: () => void;
    style?: ViewStyle;
}

export function TimeSlot({
    timeLabel,
    activity,
    categoryColor,
    categoryEmoji,
    isCurrent = false,
    isEmpty = true,
    onPress,
    style,
}: TimeSlotProps) {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const primaryColor = useColor('primary');
    const accentColor = useColor('accent');
    const mutedColor = useColor('textMuted');

    const stripColor = categoryColor || (isCurrent ? accentColor : borderColor);
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.97, SPRING_RESPONSIVE);
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
                        flexDirection: 'row',
                        backgroundColor: cardColor,
                        borderRadius: CORNERS,
                        borderWidth: BORDER_WIDTH_SM,
                        borderColor: isCurrent ? accentColor + '60' : borderColor,
                        borderCurve: 'continuous',
                        overflow: 'hidden',
                        ...SHADOW_SM,
                    },
                    animatedStyle,
                    style,
                ]}
            >
                {/* Color accent strip */}
                <View
                    style={{
                        width: 6,
                        backgroundColor: stripColor,
                    }}
                />

                {/* Content */}
                <View
                    style={{
                        flex: 1,
                        padding: SPACING_MD,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    {/* Time */}
                    <Text
                        bold
                        style={{
                            fontSize: 13,
                            color: isCurrent ? primaryColor : mutedColor,
                            minWidth: 85,
                        }}
                    >
                        {timeLabel}
                    </Text>

                    {/* Activity or empty state */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        {isEmpty ? (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: mutedColor,
                                    fontStyle: 'italic',
                                }}
                            >
                                {isCurrent ? 'Tap to log...' : 'No activity'}
                            </Text>
                        ) : (
                            <>
                                {categoryEmoji && (
                                    <Text style={{ fontSize: 18 }}>{categoryEmoji}</Text>
                                )}
                                <Text
                                    bold
                                    style={{ fontSize: 14, flex: 1 }}
                                    numberOfLines={1}
                                >
                                    {activity}
                                </Text>
                            </>
                        )}
                    </View>

                    {/* Current indicator */}
                    {isCurrent && (
                        <Badge variant="level" size="sm">NOW</Badge>
                    )}
                </View>
            </Animated.View>
        </Pressable>
    );
}
