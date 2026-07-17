"use client";

import Image from "next/image";
import { Camera, Mail } from "lucide-react";
import { profile } from "@/assets";
import PersonalDetailCard, { ProfileData } from "./components/PersonalDetailCard";
import PasswordCard from "./components/PasswordCard";
import PreferencesCard from "./components/PreferencesCard";
import SessionsCard from "./components/SessionsCard";

const mockAdmin: ProfileData & { role: string; initials: string } = {
  name: "Muhammad Awais Faryad",
  email: "awaisfaryad@devcollab.io",
  role: "Admin",
  joined: "Jan 1, 2026",
  lastLogin: "Jun 14, 2026 · 10:24 AM",
  initials: "AF",
};

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your account settings, security, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-10">
        {/* Left column — avatar */}
        <div className="lg:col-span-2">
          <div className="relative p-6 space-y-5 bg-background rounded-xl shadow-md">
            <div className="absolute -top-12">
              <div className="relative rounded-full size-20 md:size-24">
                <Image src={profile} className="size-20 md:size-24 rounded-full" alt="Hexa Logo" />
                <button className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-background! bg-primary text-white">
                  <Camera className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-12 space-y-2">
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                {mockAdmin.role}
              </span>
              <h2 className="text-2xl 2xl:text-3xl font-semibold">{mockAdmin.name}</h2>
              <p className="text-xs 2xl:text-xl flex items-center gap-2 mt-2">
                <Mail /> {mockAdmin.email}
              </p>
            </div>
          </div>
        </div>

        {/* Right column — sections */}
        <div className="lg:col-span-3 space-y-6">
          <PersonalDetailCard data={mockAdmin} />
          <PasswordCard />
          <PreferencesCard />
          <SessionsCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;