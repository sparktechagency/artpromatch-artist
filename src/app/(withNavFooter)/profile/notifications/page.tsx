'use client';

import { Radio, RadioChangeEvent, Switch } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

type NotificationKey =
  | 'bookingRequests'
  | 'bookingConfirmations'
  | 'bookingCancellations'
  | 'eventReminders'
  | 'newMessages'
  | 'appUpdates'
  | 'newAvailability'
  | 'lastMinuteBookings'
  | 'newGuestArtists';

interface NotificationSettings {
  bookingRequests: boolean;
  bookingConfirmations: boolean;
  bookingCancellations: boolean;
  eventReminders: boolean;
  newMessages: boolean;
  appUpdates: boolean;
  newAvailability: boolean;
  lastMinuteBookings: boolean;
  newGuestArtists: boolean;
}

const NotificationPage = () => {
  // Switch states
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      bookingRequests: false,
      bookingConfirmations: false,
      bookingCancellations: false,
      eventReminders: false,
      newMessages: false,
      appUpdates: false,
      newAvailability: false,
      lastMinuteBookings: false,
      newGuestArtists: false,
    });

  // Notification preference: 'app', 'email', 'sms' (Radio)
  const [notificationPreference, setNotificationPreference] = useState<
    'app' | 'email' | 'sms'
  >('app');

  // Toggle individual switch
  const handleSwitchChange = (key: NotificationKey) => (checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  // Toggle all switches
  const toggleAllNotifications = (value: boolean) => {
    const newSettings: NotificationSettings = {
      bookingRequests: value,
      bookingConfirmations: value,
      bookingCancellations: value,
      eventReminders: value,
      newMessages: value,
      appUpdates: value,
      newAvailability: value,
      lastMinuteBookings: value,
      newGuestArtists: value,
    };
    setNotificationSettings(newSettings);
    toast.success(
      value ? 'All notifications turned ON' : 'All notifications turned OFF'
    );
  };

  // Save handler
  const handleSave = async () => {
    const payload = {
      ...notificationSettings,
      notificationPreference,
    };

    try {
      // await updateNotification(payload).unwrap(); // Uncomment when API available
      console.log('Saved payload:', payload);
      toast.success('Notification settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update notification settings.');
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-secondary">Toggle all notifications</p>
        </div>
        <div className="flex gap-3">
          <button
            className="border rounded-xl px-4 py-2 text-secondary"
            onClick={() => toggleAllNotifications(true)}
          >
            Turn All On
          </button>
          <button
            className="border rounded-xl px-4 py-2 text-red-500"
            onClick={() => toggleAllNotifications(false)}
          >
            Turn All Off
          </button>
        </div>
      </div>

      {/* Individual notification switches */}
      {Object.entries(notificationSettings).map(([key, value]) => (
        <div
          key={key}
          className="border-0 border-b p-5 flex justify-between items-center mb-4"
        >
          <div>
            <h1 className="text-xl font-bold">
              {key.replace(/([A-Z])/g, ' $1')}
            </h1>
            <p className="text-secondary">Toggle {key}</p>
          </div>
          <Switch
            checked={value}
            onChange={handleSwitchChange(key as NotificationKey)}
          />
        </div>
      ))}

      {/* Notification preference Radio */}
      <div className="mt-6">
        <h1 className="text-xl font-bold mb-2">
          How You Receive Notifications
        </h1>
        <Radio.Group
          value={notificationPreference}
          onChange={(e: RadioChangeEvent) =>
            setNotificationPreference(e.target.value)
          }
        >
          <Radio value="app">App Notification</Radio>
          <Radio value="email">Email Notification</Radio>
          <Radio value="sms">SMS Notification</Radio>
        </Radio.Group>
      </div>

      {/* Save Button */}
      <div className="flex justify-end items-end mt-5">
        <button
          className="bg-primary text-white py-3 px-6 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
