'use client';

import { Switch } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const PrivacyPage = () => {
  // State for each switch
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [personalizedContent, setPersonalizedContent] = useState(true);
  const [locationBasedSuggestions, setLocationBasedSuggestions] =
    useState(true);

  const handleSwitchChange =
    (setter: (value: boolean) => void) => (checked: boolean) => {
      setter(checked);
      console.log('Switch value:', checked);
    };

  return (
    <div className="p-5">
      {/* Update Password */}
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Protect Account</h1>
          <p className="text-secondary">Change account password</p>
        </div>
        <Link href="/profile/change-password">
          <button className="border rounded-xl px-4 py-2 text-secondary">
            Update Password
          </button>
        </Link>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Two-Factor Authentication</h1>
          <p className="text-secondary">
            Add extra security by requiring a verification code when logging in.
          </p>
        </div>
        <Switch
          checked={twoFactorAuth}
          onChange={handleSwitchChange(setTwoFactorAuth)}
        />
      </div>

      {/* Personalized Content */}
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Personalized Content</h1>
          <p className="text-secondary">
            Allow the app to suggest artists and guest spots based on your
            activity.
          </p>
        </div>
        <Switch
          checked={personalizedContent}
          onChange={handleSwitchChange(setPersonalizedContent)}
        />
      </div>

      {/* Location-Based Suggestions */}
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Location-Based Suggestions</h1>
          <p className="text-secondary">
            Use your location to show nearby artists and events.
          </p>
        </div>
        <Switch
          checked={locationBasedSuggestions}
          onChange={handleSwitchChange(setLocationBasedSuggestions)}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end items-end mt-5">
        <button className="bg-primary text-white py-3 px-6 rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default PrivacyPage;
