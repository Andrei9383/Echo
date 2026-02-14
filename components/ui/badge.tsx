import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { CORNERS_SM, FONT_SIZE_XS, SPACING_XS, SPACING_SM } from '@/theme/globals';

/**
 * Echo Badge Component
 * 
 * Chunky, rounded badge for notifications, XP, levels, streaks.
 * Duolingo-style bold coloring with cartoon personality.
 */

type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'xp' | 'streak' | 'level';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    style?: ViewStyle;
    textStyle?: TextStyle;
    size?: 'sm' | 'md' | 'lg';
}

export function Badge({
    children,
    variant = 'default',
    style,
    textStyle,
    size = 'md',
}: BadgeProps) {
    const primaryColor = useColor('primary');
    const primaryFgColor = useColor('primaryForeground');
    const successColor = useColor('success');
    const warningColor = useColor('warning');
    const warningFgColor = useColor('warningForeground');
    const destructiveColor = useColor('destructive');
    const destructiveFgColor = useColor('destructiveForeground');
    const infoColor = useColor('info');
    const streakColor = useColor('streakActive');
    const xpColor = useColor('xpGain');
    const levelColor = useColor('levelBadge');
    const secondaryColor = useColor('secondary');
    const secondaryFgColor = useColor('secondaryForeground');

    const getVariantStyle = (): { bg: string; fg: string } => {
        switch (variant) {
            case 'success':
                return { bg: successColor, fg: '#ffffff' };
            case 'warning':
                return { bg: warningColor, fg: warningFgColor };
            case 'destructive':
                return { bg: destructiveColor, fg: destructiveFgColor };
            case 'info':
                return { bg: infoColor, fg: '#ffffff' };
            case 'xp':
                return { bg: xpColor, fg: '#ffffff' };
            case 'streak':
                return { bg: streakColor, fg: '#1a1530' };
            case 'level':
                return { bg: levelColor, fg: '#ffffff' };
            default:
                return { bg: secondaryColor, fg: secondaryFgColor };
        }
    };

    const getSizeStyle = (): { paddingH: number; paddingV: number; fontSize: number } => {
        switch (size) {
            case 'sm':
                return { paddingH: 6, paddingV: 2, fontSize: FONT_SIZE_XS - 1 };
            case 'lg':
                return { paddingH: 14, paddingV: 6, fontSize: FONT_SIZE_XS + 3 };
            default:
                return { paddingH: 10, paddingV: 4, fontSize: FONT_SIZE_XS + 1 };
        }
    };

    const { bg, fg } = getVariantStyle();
    const sizeStyle = getSizeStyle();

    return (
        <View
            style={[
                {
                    backgroundColor: bg,
                    borderRadius: CORNERS_SM,
                    paddingHorizontal: sizeStyle.paddingH,
                    paddingVertical: sizeStyle.paddingV,
                    alignSelf: 'flex-start',
                    borderCurve: 'continuous',
                },
                style,
            ]}
        >
            <Text
                bold
                style={[
                    {
                        color: fg,
                        fontSize: sizeStyle.fontSize,
                        fontWeight: '800',
                        letterSpacing: 0.5,
                    },
                    textStyle,
                ]}
            >
                {children}
            </Text>
        </View>
    );
}
