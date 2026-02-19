import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import {
  AlignLeft,
  BadgePlus,
  SeparatorHorizontal,
  Terminal,
} from "lucide-react-native";
import { useDb } from "@/db/provider";
import { activities, type Activity } from "@/db/schema";
import { ScrollView } from "@/components/ui/scroll-view";
import { useEffect, useState } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { BORDER_RADIUS } from "@/theme/globals";
import { activityCategories } from "@/components/sheet";
import { and, gte, lt } from "drizzle-orm";
import { StreakCounter } from "@/components/ui/streak";
import { getActivitiesByDay, getCountByDay, getStreak } from "@/activities/activities";
import { TimeSlot } from "@/components/time-slot";
import { Separator } from "@/components/ui/separator";
import * as Notifications from 'expo-notifications';
import { StreakData } from "@/activities/activities";
import { ProgressBar } from "@/components/ui/progress";

const getTimeIntervalFromTimestamp = (timestamp: string) => {
  const activityDate = new Date(timestamp);

  const hours = activityDate.getHours();
  const minutes = activityDate.getMinutes();

  if (minutes < 30) {
    return `${hours}:00 - ${hours}:30`;
  }
  return `${hours}:30 - ${hours + 1}:00`;
};
export default function HomeScreen() {
  const db = useDb();
  const bg = useColor("background");
  const [streakData, setStreakData] = useState<StreakData[]>(
    getStreak(new Date())
  )

  const [progress, setProgress] = useState(0);

  const [activityList, setActivityList] = useState<Activity[]>(
    getActivitiesByDay(new Date()),
  );

  function testNotification() {
    console.log("in test notification");
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "testing title",
        body: "testing body"
      },
      trigger: null
    })
  }

  useEffect(() => {
    const count = getCountByDay(new Date());

    setProgress(count / 48);
  }, [])


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActivityList(getActivitiesByDay(new Date()));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [activityList]);

  return (
    <>
      <View style={{ marginTop: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text variant="display" style={{ marginLeft: 24 }}>today</Text>
        <StreakCounter streakData={streakData} style={{ marginTop: 30 }} />
      </View>
      <View style={{
        padding: 24,
        marginTop: 0,
        paddingTop: 0,
      }}>
        <ProgressBar progress={progress} showLabel label="Daily Goal" />
      </View>
      <Button onPress={() => getStreak(new Date())}>Get Streak</Button>
      <Button onPress={() => getCountByDay(new Date())}>Get count</Button>
      <ScrollView
        style={{ flex: 1, backgroundColor: bg }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 120,
          gap: 32,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Link asChild href="/sheet">
          <Button variant="default" onPress={() => setActivityList(getActivitiesByDay(new Date()))}>Add activity</Button>
        </Link>
        <Button onPress={() => setActivityList(getActivitiesByDay(new Date()))}>Refresh activity list</Button>
        <Button onPress={() => getActivitiesByDay(new Date())}>
          getActivitiesByDay
        </Button>
        <Button onPress={() => testNotification()}>Send test notification</Button>
        <Separator />
        <View>
          <Text variant="label" style={{ marginBottom: 12 }}>TODAY</Text>
          <ScrollView>
            {activityList.map((activity, index) => {
              const color = activityCategories.find((cat) => cat.sub_activities.find((sub) => sub === activity.name))?.color;
              const emoji = activityCategories.find((cat) => cat.sub_activities.find((sub) => sub === activity.name))?.emoji;
              return (
                <TimeSlot
                  key={activity.id ?? activity.timestamp ?? `slot-${index}`}
                  timeLabel={getTimeIntervalFromTimestamp(activity.timestamp || "")}
                  activity={activity.name || ""}
                  categoryColor={color}
                  categoryEmoji={emoji}
                  isCurrent={false}
                  isEmpty={false}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}
