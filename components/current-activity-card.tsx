import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
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
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Echo Current Activity Card
 * 
 * A prominent, dynamic card for the top of the dashboard.
 * - State 1 (Active Activity): If an activity is logged for the current 30-minute slot.
 * - State 2 (No Activity): If empty, it displays an engaging prompt.
 */

interface CurrentActivityCardProps {
    activityName?: string | null;
    categoryColor?: string;
    categoryEmoji?: string;
    onLogPress?: () => void;
    style?: ViewStyle;
}

export function CurrentActivityCard({
    activityName,
    categoryColor,
    categoryEmoji,
    onLogPress,
    style,
}: CurrentActivityCardProps) {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const textColor = useColor('text');
    const primaryColor = useColor('primary');

    const pulseScale = useSharedValue(1);

    useEffect(() => {
        if (activityName) {
            pulseScale.value = withRepeat(
                withSequence(
                    withTiming(1.05, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1,
                true
            );
        } else {
            pulseScale.value = 1;
        }
    }, [activityName]);

    const animatedBadgeStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    const isActive = !!activityName;
    const cardBorderColor = isActive && categoryColor ? categoryColor : borderColor;
    const cardBgColor = isActive && categoryColor ? categoryColor + '18' : cardColor;

    return (
        <View
            style={[
                {
                    backgroundColor: cardBgColor,
                    borderRadius: CORNERS + 8,
                    borderWidth: BORDER_WIDTH + 1,
                    borderColor: cardBorderColor,
                    padding: 24,
                    alignItems: 'center',
                    borderCurve: 'continuous',
                    ...SHADOW_BUTTON,
                },
                style,
            ]}
        >
            {isActive ? (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 16 }}>
                        <Animated.View style={animatedBadgeStyle}>
                            <Badge variant="level" style={{ backgroundColor: categoryColor }}>NOW ACTIVE</Badge>
                        </Animated.View>
                        <Text style={{ fontSize: 32 }}>{categoryEmoji}</Text>
                    </View>
                    <Text variant="display" style={{ color: categoryColor, textAlign: 'center', fontSize: 28, marginBottom: 8 }}>
                        {activityName}
                    </Text>
                    <Text style={{ textAlign: 'center', color: textColor, opacity: 0.8 }}>
                        Keep up the focus!
                    </Text>
                </>
            ) : (
                <>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 48, marginBottom: 12 }}>👀</Text>
                        <Text variant="display" style={{ textAlign: 'center', marginBottom: 8 }}>
                            Nothing planned?
                        </Text>
                        <Text style={{ textAlign: 'center', color: textColor, opacity: 0.7 }}>
                            Log what you're doing right now to keep your streak burning!
                        </Text>
                    </View>
                    <Button variant="default" onPress={onLogPress} style={{ width: '100%' }}>
                        Log Current Activity
                    </Button>
                </>
            )}
        </View>
    );
}
