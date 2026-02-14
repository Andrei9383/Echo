import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useColor } from '@/hooks/useColor';

/**
 * Echo Separator Component
 * 
 * Simple horizontal or vertical divider with Echo styling.
 */

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    style?: ViewStyle;
    color?: string;
    thickness?: number;
}

export function Separator({
    orientation = 'horizontal',
    style,
    color,
    thickness = 2,
}: SeparatorProps) {
    const borderColor = useColor('border');
    const lineColor = color || borderColor;

    const isHorizontal = orientation === 'horizontal';

    return (
        <View
            style={[
                {
                    backgroundColor: lineColor,
                    borderRadius: thickness,
                    ...(isHorizontal
                        ? { height: thickness, width: '100%', marginVertical: 12 }
                        : { width: thickness, height: '100%', marginHorizontal: 12 }),
                },
                style,
            ]}
        />
    );
}
