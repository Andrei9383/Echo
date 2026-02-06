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
import { AlignLeft, SeparatorHorizontal, Terminal } from "lucide-react-native";
import { useDb } from "@/db/provider";
import { activities, type Activity } from "@/db/schema";
import { ScrollView } from "@/components/ui/scroll-view";
import { useEffect, useState } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { BORDER_RADIUS } from "@/theme/globals";
import { activityCategories } from "@/components/sheet";

export default function HomeScreen() {
  const green = useColor("green");
  const muted = useColor("muted");
  const card = useColor("card");
  const primary = useColor("primary");
  const db = useDb();

  const [localActivities, setLocalActivities] = useState<Activity[]>([]);
  const { data } = useLiveQuery(db.select().from(activities));

  const addActivity = async () => {
    await db.insert(activities).values({
      name: "New Activity",
      timestamp: new Date().toISOString(),
    });
  };
  const fetchActivities = async () => {
    const allActivities = db.select().from(activities).all();
    setLocalActivities(allActivities);
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  const getAgoTextFromTimestamp = (timestamp: string) => {
    const activityDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - activityDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute(s) ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour(s) ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day(s) ago`;
    }
  };

  const getTimeIntervalFromTimestamp = (timestamp: string) => {
    const activityDate = new Date(timestamp);

    const hours = activityDate.getUTCHours();
    const minutes = activityDate.getUTCMinutes();

    if (minutes <= 30) {
      return `${hours}:00 - ${hours}:30`;
    }
    return `${hours}:30 - ${hours + 1}:00`;
  };

  return (
    <View style={{ flex: 1, gap: 16, padding: 24, justifyContent: "center" }}>
      <View
        style={{
          height: 150,
          borderWidth: 1,
          borderColor: card,
          borderRadius: BORDER_RADIUS,
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {/* <ScrollView
          style={{
            padding: 16,
          }}
          horizontal={true}
        > */}

        {data && data.length > 0 && (
          <View
            style={{
              flex: 1,
              gap: 0,
              padding: 24,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 30,
                fontWeight: "900",
                fontFamily: "Roboto",
              }}
            >
              {getTimeIntervalFromTimestamp(
                data[data.length - 1].timestamp || "",
              )}
            </Text>
            <View
              key={data[data.length - 1].id}
              style={{
                width: 300,
                height: 150,
                backgroundColor:
                  activityCategories.find(
                    (cat) => cat.name === data[data.length - 1].name,
                  )?.color + "2F",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "gray",
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text>
                {data[data.length - 1].name} - {data[data.length - 1].timestamp}
              </Text>
              <Text>
                {getAgoTextFromTimestamp(data[data.length - 1].timestamp || "")}
              </Text>
            </View>
          </View>
        )}
        {/* </ScrollView> */}
      </View>

      <Link asChild href="/sheet">
        <Button variant="default">Hello</Button>
      </Link>
      <Button onPress={() => db.delete(activities)}>Clear DB</Button>
      <Button onPress={() => fetchActivities()}>Refresh</Button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
    // <View
    //   style={{
    //     flex: 1,
    //     gap: 16,
    //     padding: 24,
    //     justifyContent: 'center',
    //   }}
    // >
    /* <Text
        variant='heading'
        style={{
          textAlign: 'center',
        }}
      >
        Built with ❤️ by BNA
      </Text>

      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Card>
          <View
            style={{
              gap: 8,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name={Terminal} />

            <Text
              variant='body'
              style={{
                fontWeight: '600',
              }}
            >
              Add Components
            </Text>
          </View>
          <View
            style={{
              backgroundColor: muted,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              marginBottom: 16,
              minWidth: '100%',
            }}
          >
            <Text
              variant='caption'
              style={{
                color: green,
                fontFamily: 'monospace',
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              npx bna-ui add avatar
            </Text>
          </View>
          <Text
            variant='caption'
            style={{
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            Add components with a single command
          </Text>
        </Card>
      </View>

      <Link asChild href='/sheet'>
        <Button>Open Components Sheet</Button>
      </Link> */
    // </View>
  );
}
