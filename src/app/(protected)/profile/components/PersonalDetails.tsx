import React, { useState } from 'react'
import {
  Camera,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  LogOut,
  Loader2,
  CheckCircle2,
  Bell,
  Moon,
  Globe,
  Mail,
} from "lucide-react";
const PersonalDetails = () => {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
  
    const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }, 1200);
    };

  return (
    <>
    <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
            
      <div className=" space-y-3">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">Personal information</h3>
      </div>
            <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Profile saved successfully
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </button>
      </div>
          </div>
    </>
  )
}

export default PersonalDetails