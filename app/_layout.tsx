import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/colors";
import { ThemeProvider } from "@/theme/theme-provider";
import { osName } from "expo-device";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import {
  useFonts,
  BricolageGrotesque_400Regular,
  BricolageGrotesque_700Bold,
} from "@expo-google-fonts/bricolage-grotesque";
import migrations from "@/drizzle/migrations";
import { Suspense } from "react";
import { Text } from "@/components/ui/text";
import { ActivityIndicator } from "react-native";
import { DATABASE_NAME, createDb } from "@/db/provider";

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_700Bold,
  });

  const db = React.useMemo(() => createDb(), []);
  const { success: migrationsSuccess, error: migrationsError } = useMigrations(
    db,
    migrations,
  );

  const colorScheme = useColorScheme() || "light";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(
        colorScheme === "light" ? "dark" : "light",
      );
    }
  }, [colorScheme]);

  // Keep the root view background color in sync with the current theme
  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    );
  }, [colorScheme]);

  if (migrationsError) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"}
            animated
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Database migration failed. : {migrationsError.message}</Text>
          </View>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  if (!migrationsSuccess || !fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"}
            animated
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} animated />

        <Suspense fallback={<ActivityIndicator size="large" />}>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
            useSuspense
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen
                name="sheet"
                options={{
                  headerShown: false,
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [1],
                  contentStyle: {
                    backgroundColor: isLiquidGlassAvailable()
                      ? "transparent"
                      : colorScheme === "dark"
                        ? Colors.dark.card
                        : Colors.light.card,
                  },
                  headerTransparent: Platform.OS === "ios" ? true : false,
                  headerLargeTitle: false,
                  title: "",
                  presentation:
                    Platform.OS === "ios"
                      ? isLiquidGlassAvailable() && osName !== "iPadOS"
                        ? "formSheet"
                        : "modal"
                      : "modal",
                  sheetInitialDetentIndex: 0,
                  headerStyle: {
                    backgroundColor:
                      Platform.OS === "ios"
                        ? "transparent"
                        : colorScheme === "dark"
                          ? Colors.dark.card
                          : Colors.light.card,
                  },
                  headerBlurEffect: isLiquidGlassAvailable()
                    ? undefined
                    : colorScheme === "dark"
                      ? "dark"
                      : "light",
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SQLiteProvider>
        </Suspense>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
