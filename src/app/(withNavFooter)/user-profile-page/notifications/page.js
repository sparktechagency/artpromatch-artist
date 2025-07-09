"use client";

import { useUpdateNotificationMutation } from "@/redux/api/features/notificationApi/notificationApi";
import { Radio, Switch, message } from "antd";
import React, { useState } from "react";

const NotificationPage = () => {
  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();

  const [notificationSettings, setNotificationSettings] = useState({
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

  const [notificationPreferences, setNotificationPreferences] = useState([
    "app",
    "email",
  ]);

  // ✅ Toggle individual switch
  const handleSwitchChange = (key) => (checked) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  // ✅ Toggle ALL switches
  const toggleAllNotifications = (value) => {
    const data = {
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
    const res = setNotificationSettings(data).unwrap;
    message.success(res?.message);
  };

  // ✅ Save handler
  const handleSave = async () => {
    const payload = {
      ...notificationSettings,
      notificationPreferences,
    };

    try {
      await updateNotification(payload).unwrap();
      message.success("Notification settings updated successfully!");
    } catch (error) {
      message.error("Failed to update notification settings.");
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-textSecondary">Toggle all notifications</p>
        </div>
        <div className="flex gap-3">
          <button
            className="border rounded-xl px-4 py-2 text-secondary"
            onClick={() => toggleAllNotifications(true)}
          >
            Turn All On
          </button>
          {/* <button
            className="border rounded-xl px-4 py-2 text-red-500"
            onClick={() => toggleAllNotifications(false)}
          >
            Turn All Off
          </button> */}
        </div>
      </div>

      {Object.entries(notificationSettings).map(([key, value]) => (
        <div
          key={key}
          className="border-0 border-b p-5 flex justify-between items-center mb-4"
        >
          <div>
            <h1 className="text-xl font-bold">
              {key.replace(/([A-Z])/g, " $1")}
            </h1>
            <p className="text-textSecondary">Toggle {key}</p>
          </div>
          <Switch checked={value} onChange={handleSwitchChange(key)} />
        </div>
      ))}

      <div className="mt-6">
        <h1 className="text-xl font-bold mb-2">
          How You Receive Notifications
        </h1>
        <div className="flex flex-wrap gap-4">
          {["app", "email", "sms"].map((method) => (
            <Radio
              key={method}
              value={method}
              checked={notificationPreferences.includes(method)}
              onClick={() => {
                setNotificationPreferences((prev) =>
                  prev.includes(method)
                    ? prev.filter((m) => m !== method)
                    : [...prev, method]
                );
              }}
            >
              <span className="text-textSecondary capitalize">
                {method} Notification
              </span>
            </Radio>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-end mt-5">
        <button
          className="bg-primary text-white py-3 px-6 rounded-lg"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
