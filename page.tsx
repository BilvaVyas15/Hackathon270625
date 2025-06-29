'use client';

import React, { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  option: string;
  photo?: string;
}

const options = ['Student', 'Teacher', 'Other'];

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    option: 'Student',
    photo: '',
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, option: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserData({ ...userData, photo: ev.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10 tracking-wide">👤 User Profile</h2>

        <div className="flex flex-col items-center mb-10">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="w-36 h-36 rounded-full border-4 border-dashed border-indigo-400 bg-indigo-100 flex items-center justify-center overflow-hidden">
              {userData.photo ? (
                <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-indigo-500 font-medium">Upload Photo</span>
              )}
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="text-lg text-gray-800 space-y-4 mb-10">
          <div>
            <strong>Name:</strong> <span className="ml-2 text-indigo-900">{userData.name}</span>
          </div>
          <div>
            <strong>Email:</strong> <span className="ml-2 text-indigo-900">{userData.email}</span>
          </div>
          <div>
            <strong>Role:</strong>
            <div className="mt-2 flex gap-6">
              {options.map((opt) => (
                <label key={opt} className={`cursor-pointer font-semibold ${userData.option === opt ? 'text-indigo-700' : 'text-gray-500'}`}>
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={userData.option === opt}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4 border-b pb-2 border-indigo-200">📄 Profile Summary</h3>
          <div className="text-gray-800 space-y-3">
            <div><strong>Name:</strong> {userData.name}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Role:</strong> {userData.option}</div>
            {userData.photo && (
              <div>
                <strong>Photo:</strong>
                <div className="mt-2">
                  <img src={userData.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-indigo-300" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
