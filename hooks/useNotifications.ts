import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const useDailyNotification = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // 1. Request permissions
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });

        if (status !== 'granted') {
          console.warn('Notification permissions not granted');
          return;
        }

        // 2. Cancel any existing notifications to avoid duplicates
        // await Notifications.cancelAllScheduledNotificationsAsync();

        // 3. Set up the notification category (with the Snooze action)
        // await Notifications.setNotificationCategoryAsync('DAILY_REMINDER', [
        //   {
        //     identifier: 'SNOOZE_ACTION',
        //     buttonTitle: 'Snooze 2 hours',
        //     options: {
        //       isDestructive: false,
        //       isAuthenticationRequired: false,
        //     },
        //   },
        // ]);
        //
        // // 4. Schedule the new daily notification
        // await scheduleNotification();
        // console.log('Daily notification scheduled successfully for 18:00');
        //
        // // 5. Set up notification response listener
        // const subscription = Notifications.addNotificationResponseReceivedListener(
        //   handleNotificationResponse
        // );
        //
        // // Cleanup the listener when unmounting
        // return () => {
        //   subscription.remove();
        // };
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  // const handleNotificationResponse = async (response) => {
  //   const { actionIdentifier } = response;
  //
  //   if (actionIdentifier === 'SNOOZE_ACTION') {
  //     await scheduleSnoozeNotification();
  //   }
  // };
  //
  // const scheduleNotification = async () => {
  //   try {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: 'Title',
  //         body: 'Body.',
  //         sound: true,
  //         categoryIdentifier: 'DAILY_REMINDER',
  //       },
  //       trigger: {
  //         hour: 18,
  //         minute: 0,
  //         repeats: true,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error scheduling notification:', error);
  //     throw error;
  //   }
  // };
  //
  // const scheduleSnoozeNotification = async () => {
  //   try {
  //     // Schedule a one-time notification for 2 hours from now
  //     const snoozeTime = new Date();
  //     snoozeTime.setHours(snoozeTime.getHours() + 2);
  //
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: 'Title (Snoozed)',
  //         body: 'Body.',
  //         sound: true,
  //         categoryIdentifier: 'DAILY_REMINDER',
  //       },
  //       trigger: {
  //         date: snoozeTime,
  //       },
  //     });
  //
  //     console.log('Snooze notification scheduled for 2 hours from now');
  //   } catch (error) {
  //     console.error('Error scheduling snooze notification:', error);
  //   }
  // };
};

export default useDailyNotification;


