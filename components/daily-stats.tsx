import React from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { CORNERS, BORDER_WIDTH_SM, SPACING_MD, SHADOW_SM } from '@/theme/globals';

/**
 * Echo Daily Stats
 * 
 * A horizontal scrollable list of mini-cards showing the breakdown
 * of today's activities by category.
 */

export interface CategoryStat {
    id: string;
    name: string;
    emoji: string;
    color: string;
    count: number;
}

interface DailyStatsProps {
    stats: CategoryStat[];
    style?: ViewStyle;
}

export function DailyStats({ stats, style }: DailyStatsProps) {
    const cardColor = useColor('card');
    const borderColor = useColor('border');
    const textColor = useColor('text');

    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <View style={style}>
            <Text variant="label" style={{ marginBottom: 12, paddingHorizontal: 24 }}>TODAY'S BREAKDOWN</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            >
                {stats.map((stat) => (
                    <View
                        key={stat.id}
                        style={{
                            backgroundColor: cardColor,
                            borderRadius: CORNERS,
                            borderWidth: BORDER_WIDTH_SM,
                            borderColor: borderColor,
                            padding: SPACING_MD,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                            ...SHADOW_SM,
                        }}
                    >
                        <View style={{
                            backgroundColor: stat.color + '20',
                            padding: 8,
                            borderRadius: CORNERS - 4,
                        }}>
                            <Text style={{ fontSize: 24 }}>{stat.emoji}</Text>
                        </View>
                        <View>
                            <Text bold style={{ fontSize: 14, color: textColor }}>{stat.name}</Text>
                            <Text style={{ fontSize: 13, color: stat.color, fontWeight: '700' }}>
                                {stat.count / 2} {stat.count === 2 ? 'hr' : 'hrs'}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
