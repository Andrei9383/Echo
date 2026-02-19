import { Button } from "./ui/button";
import { ScrollView } from "./ui/scroll-view";
import { Text } from "./ui/text";
import { View } from "./ui/view";
import ActivityButton from "./activity-button";
import { useState } from "react";
import { useDb } from "@/db/provider";
import { activities } from "@/db/schema";
import { router } from "expo-router";
import { insertActivity } from "@/activities/activities";
import { activityCategories } from "@/constants/activities";

export default function SheetScreen() {
  const [subcategory, setSubcategory] = useState<string>("");
  const db = useDb();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingTop: 40,
        paddingBottom: 100,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 8,
          alignContent: "space-evenly",
          justifyContent: "space-evenly",
        }}
      >
        {!subcategory ? (
          activityCategories.map((item, index) => (
            <ActivityButton
              key={index}
              emoji={item.emoji}
              label={item.name}
              color={item.color}
              onPress={() => setSubcategory(item.id)}
            />
          ))
        ) : (
          <>
            <Button
              variant="outline"
              onPress={() => setSubcategory("")}
              style={{ marginBottom: 16 }}
            >
              ← Back
            </Button>
            {activityCategories
              .find((cat) => cat.id === subcategory)
              ?.sub_activities.map((subItem, subIndex) => (
                <ActivityButton
                  key={subIndex}
                  label={subItem}
                  color={
                    activityCategories.find((cat) => cat.id === subcategory)
                      ?.color
                  }
                  onPress={() => {
                    insertActivity(subItem, new Date().toISOString());
                    setSubcategory("");
                    router.back();
                  }}
                />
              ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

