import { Button } from "./ui/button";
import { ScrollView } from "./ui/scroll-view";
import { Text } from "./ui/text";
import { View } from "./ui/view";
import ActivityButton from "./activity-button";
import { useState } from "react";
import { useDb } from "@/db/provider";
import { activities } from "@/db/schema";
import { router } from "expo-router";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export default function SheetScreen() {
  const [subcategory, setSubcategory] = useState<string>("");
  const db = useDb();

  function foregroundContrast(color: string): string {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // return luminance > 0.5 ? "#000000" : "#FFFFFF";
    return "#FFFFFF";
  }
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingTop: 40,
        paddingBottom: 100,
      }}
    >
      {/* <Text variant="heading" style={{ marginBottom: 16 }}>
        BNA UI
      </Text> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
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
              style={{
                marginVertical: 2,
                backgroundColor: item.color + "2F",
                borderColor: item.color + "FF",
              }}
              onPress={() => setSubcategory(item.id)}
            >
              <Text>{item.name}</Text>
            </ActivityButton>
          ))
        ) : (
          <>
            <Button
              variant="outline"
              onPress={() => setSubcategory("")}
              style={{ marginBottom: 16 }}
            >
              Back
            </Button>
            {activityCategories
              .find((cat) => cat.id === subcategory)
              ?.sub_activities.map((subItem, subIndex) => (
                <ActivityButton
                  key={subIndex}
                  style={{
                    marginVertical: 2,
                    backgroundColor:
                      activityCategories.find((cat) => cat.id === subcategory)
                        ?.color + "2F",
                  }}
                  onPress={() => {
                    db.insert(activities)
                      .values({
                        name: subItem,
                        timestamp: new Date().toISOString(),
                      })
                      .then(() => {
                        setSubcategory("");
                        router.back();
                      });
                  }}
                >
                  <Text>{subItem}</Text>
                </ActivityButton>
              ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export const activityCategories = [
  {
    id: "work_career",
    name: "Work & Career",
    color: "#3B82F6",
    color_name: "Focus Blue",
    sub_activities: [
      "Deep Work (Focus)",
      "Shallow Work (Admin/Email)",
      "Meetings (In-person)",
      "Meetings (Virtual)",
      "Planning & Strategy",
      "Learning/Training",
      "Networking",
      "Business Travel",
      "Side Hustle / Freelance",
      "Job Searching",
    ],
  },
  {
    id: "health_fitness",
    name: "Health & Fitness",
    color: "#10B981",
    color_name: "Emerald Green",
    sub_activities: [
      "Strength Training",
      "Cardio / Running",
      "Yoga / Stretching",
      "Team Sports",
      "Meditation / Mindfulness",
      "Therapy / Counseling",
      "Doctor / Dentist Appointment",
      "Sick / Recovering",
      "Taking Medication/Supplements",
    ],
  },
  {
    id: "biological_needs",
    name: "Biological Needs",
    color: "#A5B4FC",
    color_name: "Calm Periwinkle",
    sub_activities: [
      "Sleeping (Night)",
      "Napping",
      "Lying in Bed (Awake)",
      "Showering / Bathing",
      "Grooming / Skincare",
      "Bathroom",
      "Dressing / Undressing",
    ],
  },
  {
    id: "food_drink",
    name: "Food & Drink",
    color: "#F97316",
    color_name: "Vibrant Orange",
    sub_activities: [
      "Cooking / Meal Prep",
      "Eating (Alone)",
      "Eating (Socially)",
      "Snacking",
      "Making Coffee/Tea",
      "Drinking Alcohol",
      "Cleaning Dishes",
    ],
  },
  {
    id: "development_learning",
    name: "Personal Development",
    color: "#8B5CF6",
    color_name: "Wisdom Violet",
    sub_activities: [
      "Reading (Non-fiction)",
      "Reading (Fiction)",
      "Taking Online Courses",
      "Listening to Podcasts (Educational)",
      "Journaling / Writing",
      "Practicing a Skill (Music/Art)",
      "Religious / Spiritual Practice",
      "Language Learning",
    ],
  },
  {
    id: "social_relationships",
    name: "Social & Relationships",
    color: "#EC4899",
    color_name: "Connection Pink",
    sub_activities: [
      "Partner / Spouse Quality Time",
      "Intimacy",
      "Parenting / Childcare",
      "Helping Family",
      "Hanging out with Friends",
      "Phone Call / Facetime",
      "Texting / Messaging",
      "Attending Social Events",
    ],
  },
  {
    id: "chores_home",
    name: "Chores & Home Maintenance",
    color: "#D97706",
    color_name: "Bronze/Brown",
    sub_activities: [
      "Cleaning House",
      "Laundry",
      "Grocery Shopping",
      "Home Repairs / DIY",
      "Gardening / Yard Work",
      "Pet Care (Walking/Feeding)",
      "Car Maintenance",
      "Financial Management / Budgeting",
      "Decluttering",
    ],
  },
  {
    id: "transit_commute",
    name: "Transit & Commute",
    color: "#64748B",
    color_name: "Slate Grey",
    sub_activities: [
      "Driving (Commute)",
      "Public Transport (Commute)",
      "Walking (Transit)",
      "Cycling (Transit)",
      "Driving (Errands)",
      "Waiting for Transport",
      "Air Travel",
    ],
  },
  {
    id: "leisure_recreation",
    name: "Leisure & Recreation",
    color: "#EAB308",
    color_name: "Sunshine Yellow",
    sub_activities: [
      "Watching Movies / TV",
      "Gaming (Console/PC)",
      "Mobile Gaming",
      "Listening to Music",
      "Hobbies (Crafting/Building)",
      "Attending Live Events (Concerts/Sports)",
      "Outdoor Activities (Hiking/Camping)",
      "Shopping (Leisure)",
    ],
  },
  {
    id: "digital_consumption",
    name: "Digital Consumption",
    color: "#6366F1",
    color_name: "Screen Indigo",
    sub_activities: [
      "Social Media Scrolling (Instagram/TikTok)",
      "Browsing News / Politics",
      "YouTube (Entertainment)",
      "Browsing Reddit / Forums",
      "Online Window Shopping",
      "Sorting Digital Files / Photos",
      "Checkin Emails (Non-work)",
    ],
  },
  {
    id: "idle_waste",
    name: "Idle / Low Energy",
    color: "#EF4444",
    color_name: "Alert Red",
    sub_activities: [
      "Procrastinating",
      "Daydreaming / Staring",
      "Waiting (Generic)",
      "Complaining / Venting",
      "Hungover",
      "Searching for Lost Items",
    ],
  },
];

const bnaComponents = [
  "🪗 Accordion",
  "📜 Action Sheet",
  "🚨 Alert",
  "💬 Alert Dialog",
  "🎧 Audio Player",
  "🎙️ Audio Recorder",
  "🌊 Audio Waveform",
  "👤 Avatar",
  "🎯 AvoidKeyboard",
  "🏷️ Badge",
  "📥 BottomSheet",
  "🔘 Button",
  "📸 Camera",
  "🎥 Camera Preview",
  "🃏 Card",
  "🎠 Carousel",
  "☑️ Checkbox",
  "📂 Collapsible",
  "🎨 Color Picker",
  "🔽 Combobox",
  "📅 Date Picker",
  "📁 File Picker",
  "🖼️ Gallery",
  "👋 Hello Wave",
  "⭐ Icon",
  "🖼️ Image",
  "⌨️ Input",
  "🔢 Input OTP",
  "🔗 Link",
  "🎞️ MediaPicker",
  "🌙 Mode Toggle",
  "🚀 Onboarding",
  "🪟 ParallaxScrollView",
  "🎚️ Picker",
  "💭 Popover",
  "📊 Progress",
  "🔘 Radio",
  "📜 ScrollView",
  "🔍 SearchBar",
  "➖ Separator",
  "📤 Share",
  "📄 Sheet",
  "👻 Skeleton",
  "🌀 Spinner",
  "💡 Switch",
  "📋 Table",
  "📑 Tabs",
  "🔤 Text",
  "🔥 Toast",
  "🎚️ Toggle",
  "🎬 Video",
  "🧩 View",
];
