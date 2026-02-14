import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Code, Eye, Palette, Settings } from 'lucide-react-native';
import ShowcaseScreen from '@/components/showcase';

export default function SettingsScreen() {
  const card = useColor('card');
  const border = useColor('border');
  const primary = useColor('primary');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        gap: 18,
        paddingTop: 12,
        alignItems: 'center',
      }}
    >
      <ModeToggle />

      <View
        style={{
          width: '90%',
          marginBottom: 40,
        }}
      >
        <ShowcaseScreen />
      </View>
    </ScrollView>
  );
}

const features = [
  {
    title: 'Live Preview',
    description: 'See components in action with real-time demos',
    icon: Eye,
  },
  {
    title: 'Code Examples',
    description: 'Copy-paste ready code snippets',
    icon: Code,
  },
  {
    title: 'Customizable',
    description: 'Easy to customize with your brand colors',
    icon: Palette,
  },
  {
    title: 'Accessible',
    description: 'Built with accessibility in mind',
    icon: Settings,
  },
];
