import { useDb, createDb } from "@/db/provider";
import { activities, type Activity } from "@/db/schema";
import { and, gte, lt, lte } from "drizzle-orm";
import { ActivityIndicatorProperties } from "react-native";

export function getAllActivities() {
  const db = createDb();
  return db.get(activities);
}

export function insertActivity(name: string, timestamp: string) {
  const db = createDb();

  const activityAtDate = getActivityAtDate(new Date(timestamp));

  console.log("insertActivity: ", activityAtDate);

  if (activityAtDate.length !== 0) {
    console.log("couldn't insert");
  } else {
    db.insert(activities)
      .values({
        name,
        timestamp,
      })
      .run();
    console.log("inserted successfully");
  }
}

export function getActivityAtDate(date: Date) {
  const db = createDb();

  if (date.getMinutes() < 30) {
    const start = new Date(date);
    start.setMinutes(0);
    const end = new Date(date);
    end.setMinutes(30);
    const result = db
      .select()
      .from(activities)
      .where(
        and(
          gte(activities.timestamp, start.toISOString()),
          lt(activities.timestamp, end.toISOString()),
        ),
      )
      .all();

    return result;
  } else {
    const start = new Date(date);
    start.setMinutes(30);
    const end = new Date(date);
    end.setMinutes(0);
    end.setHours(end.getHours() + 1);

    const result = db
      .select()
      .from(activities)
      .where(
        and(
          gte(activities.timestamp, start.toISOString()),
          lt(activities.timestamp, end.toISOString()),
        ),
      )
      .all();

    return result;
  }
}

export function getActivitiesByDay(date: Date) {
  const db = createDb();
  const start = new Date(date);
  const end = new Date(date);

  start.setHours(0, 0, 0);
  end.setHours(23, 59, 0);

  console.log("getActivitiesByDay: ", start, end);

  const result: Activity[] = db
    .select()
    .from(activities)
    .where(
      and(
        gte(activities.timestamp, start.toISOString()),
        lt(activities.timestamp, end.toISOString()),
      ),
    )
    .all();

  const allActivities: Activity[] = [];
  while (start < end) {
    let found = false;
    for (const activity of result) {
      if (activity.timestamp != null) {
        const currentDate = new Date(activity.timestamp);
        if (currentDate.getHours() === start.getHours()) {
          if (start.getMinutes() < 30) {
            if (currentDate.getMinutes() < 30) {
              allActivities.push(activity);
              found = true;
            }
          } else {
            if (currentDate.getMinutes() >= 30) {
              allActivities.push(activity);
              found = true;
            }
          }
        }
      }
    }
    if (!found) {
      allActivities.push({
        id: 0,
        name: "",
        timestamp: start.toISOString(),
      });
    }
    start.setMinutes(start.getMinutes() + 30);
    if (start.getMinutes() >= 60) {
      start.setHours(start.getHours() + 1);
      start.setMinutes(0);
    }
  }

  console.log("getActivitiesByDay: ", result);
  console.log("2. getActivitiesByDay: ", allActivities);
  console.log("3. getActivitiesByDayLength: ", allActivities.length);

  return allActivities;
}
