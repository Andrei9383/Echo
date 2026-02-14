import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar, XpProgress } from '@/components/ui/progress';
import { StreakCounter } from '@/components/ui/streak';
import { Chip } from '@/components/ui/chip';
import { StatCard } from '@/components/stat-card';
import { TimeSlot } from '@/components/time-slot';
import { EchoMascot } from '@/components/echo-mascot';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Separator } from '@/components/ui/separator';
import { useColor } from '@/hooks/useColor';
import ActivityButton from '@/components/activity-button';
import { Bell, Heart, Zap, TrendingUp, Award } from 'lucide-react-native';

/**
 * Echo Component Showcase
 * 
 * Full visual reference of every Echo UI component.
 * This page demonstrates the complete design system.
 */

export default function ShowcaseScreen() {
    const bg = useColor('background');
    const [toggleValue, setToggleValue] = useState(true);
    const [selectedChip, setSelectedChip] = useState('all');

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: bg }}
            contentContainerStyle={{
                padding: 24,
                paddingBottom: 120,
                gap: 32,
            }}
            contentInsetAdjustmentBehavior="automatic"
        >
            {/* ═══════════════════════════════════════════════ */}
            {/* MASCOT */}
            {/* ═══════════════════════════════════════════════ */}
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
                <EchoMascot
                    size={140}
                    message="Welcome to Echo! 🦇"
                    mood="happy"
                />
            </View>

            {/* ═══════════════════════════════════════════════ */}
            {/* TYPOGRAPHY */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>TYPOGRAPHY</Text>
                <Text variant="display">Display</Text>
                <Text variant="heading">Heading</Text>
                <Text variant="title">Title</Text>
                <Text variant="subtitle">Subtitle</Text>
                <Text variant="body">Body text — the default for paragraphs and content.</Text>
                <Text variant="caption">Caption — muted secondary text</Text>
                <Text variant="label">LABEL</Text>
                <Text variant="tiny">Tiny — smallest text variant</Text>
                <Text variant="link">Link text</Text>
                <Text variant="mono">Monospace text</Text>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* BUTTONS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>BUTTONS</Text>
                <View style={{ gap: 10 }}>
                    <Button variant="default" icon={Zap}>Primary Action</Button>
                    <Button variant="accent" icon={Heart}>Accent</Button>
                    <Button variant="success" icon={TrendingUp}>Success</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Button size="icon" icon={Bell} />
                        <Button size="icon" icon={Award} variant="accent" />
                        <Button size="icon" icon={Heart} variant="success" />
                    </View>
                    <Button loading>Loading...</Button>
                    <Button disabled>Disabled</Button>
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* BADGES */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>BADGES</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    <Badge>Default</Badge>
                    <Badge variant="success">✓ Done</Badge>
                    <Badge variant="warning">⚡ Warning</Badge>
                    <Badge variant="destructive">Alert</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="xp">+50 XP</Badge>
                    <Badge variant="streak">🔥 Streak</Badge>
                    <Badge variant="level">Level 5</Badge>
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* CHIPS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>CHIPS / FILTERS</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    <Chip
                        label="All"
                        selected={selectedChip === 'all'}
                        onPress={() => setSelectedChip('all')}
                    />
                    <Chip
                        label="Work"
                        emoji="💼"
                        color="#3B82F6"
                        selected={selectedChip === 'work'}
                        onPress={() => setSelectedChip('work')}
                    />
                    <Chip
                        label="Health"
                        emoji="💪"
                        color="#10B981"
                        selected={selectedChip === 'health'}
                        onPress={() => setSelectedChip('health')}
                    />
                    <Chip
                        label="Social"
                        emoji="👥"
                        color="#EC4899"
                        selected={selectedChip === 'social'}
                        onPress={() => setSelectedChip('social')}
                    />
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* CARDS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>CARDS</Text>
                <View style={{ gap: 12 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Summary</CardTitle>
                            <CardDescription>Your activity breakdown for today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Text>You've logged 14 out of 16 time slots today!</Text>
                        </CardContent>
                        <CardFooter>
                            <Badge variant="success">87% Complete</Badge>
                            <Badge variant="xp">+120 XP</Badge>
                        </CardFooter>
                    </Card>

                    <Card animated>
                        <CardContent style={{ alignItems: 'center', gap: 8 }}>
                            <Text style={{ fontSize: 32 }}>🎯</Text>
                            <Text variant="subtitle">Tap me — I bounce!</Text>
                            <Text variant="caption">This card has animated=true</Text>
                        </CardContent>
                    </Card>
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* STAT CARDS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>STAT CARDS</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <StatCard emoji="⏱" value="14" label="Slots Logged" />
                    <StatCard emoji="🔥" value="7" label="Day Streak" color="#ffc63e" />
                    <StatCard emoji="⚡" value="420" label="Total XP" color="#58d4a0" />
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* PROGRESS BARS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>PROGRESS</Text>
                <View style={{ gap: 16 }}>
                    <ProgressBar progress={0.72} showLabel label="Daily Goal" />
                    <ProgressBar progress={0.45} color="#58d4a0" showLabel label="Weekly Goal" />
                    <ProgressBar progress={0.9} color="#e8879b" />
                    <XpProgress currentXp={340} targetXp={500} />
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* STREAK COUNTER */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>STREAK</Text>
                <StreakCounter
                    count={7}
                    days={[true, true, true, true, true, true, true]}
                />
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* TIME SLOTS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>TIME SLOTS</Text>
                <View style={{ gap: 8 }}>
                    <TimeSlot
                        timeLabel="09:00 – 09:30"
                        activity="Yoga / Stretching"
                        categoryColor="#10B981"
                        categoryEmoji="🧘"
                        isEmpty={false}
                    />
                    <TimeSlot
                        timeLabel="09:30 – 10:00"
                        activity="Deep Work (Focus)"
                        categoryColor="#3B82F6"
                        categoryEmoji="💻"
                        isEmpty={false}
                    />
                    <TimeSlot
                        timeLabel="10:00 – 10:30"
                        isCurrent
                    />
                    <TimeSlot
                        timeLabel="10:30 – 11:00"
                    />
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* ACTIVITY BUTTONS */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>ACTIVITY BUTTONS</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        justifyContent: 'center',
                    }}
                >
                    <ActivityButton emoji="💼" label="Work & Career" color="#3B82F6" />
                    <ActivityButton emoji="💪" label="Health & Fitness" color="#10B981" />
                    <ActivityButton emoji="🧠" label="Personal Dev" color="#8B5CF6" />
                    <ActivityButton emoji="👥" label="Social" color="#EC4899" />
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* TOGGLE SWITCH */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>TOGGLE</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <ToggleSwitch
                        value={toggleValue}
                        onValueChange={setToggleValue}
                    />
                    <Text>Notifications {toggleValue ? 'On' : 'Off'}</Text>
                </View>
            </View>

            <Separator />

            {/* ═══════════════════════════════════════════════ */}
            {/* COLOR PALETTE */}
            {/* ═══════════════════════════════════════════════ */}
            <View>
                <Text variant="label" style={{ marginBottom: 12 }}>ECHO COLOR PALETTE</Text>
                <View style={{ gap: 8 }}>
                    <ColorRow label="Primary" color={useColor('primary')} />
                    <ColorRow label="Accent" color={useColor('accent')} />
                    <ColorRow label="Success" color={useColor('success')} />
                    <ColorRow label="Warning" color={useColor('warning')} />
                    <ColorRow label="Destructive" color={useColor('destructive')} />
                    <ColorRow label="Info" color={useColor('info')} />
                    <ColorRow label="Echo Body" color={useColor('echoBody')} />
                    <ColorRow label="Echo Belly" color={useColor('echoBelly')} />
                    <ColorRow label="Echo Ear" color={useColor('echoEar')} />
                    <ColorRow label="Echo Night" color={useColor('echoNight')} />
                    <ColorRow label="Streak" color={useColor('streakActive')} />
                    <ColorRow label="XP" color={useColor('xpGain')} />
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function ColorRow({ label, color }: { label: string; color: string }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: color,
                    borderWidth: 2,
                    borderColor: color + '40',
                    borderCurve: 'continuous',
                }}
            />
            <View>
                <Text bold style={{ fontSize: 13 }}>{label}</Text>
                <Text variant="tiny">{color}</Text>
            </View>
        </View>
    );
}
