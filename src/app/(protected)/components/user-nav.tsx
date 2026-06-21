import { BadgeCheck, HelpCircle, LogOut, Settings, User, ChevronsUpDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react'

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string; // optional avatar URL
}

const UserNav = () => {
  // Sample user data - replace with your actual user data
  const user: User = {
    firstName: 'Awais',
    lastName: 'Faryad',
    email: 'awaisfaryad25@gmail.com',
    // avatar: 'https://example.com/avatar.jpg' // uncomment if you have an avatar URL
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get initials from first and last name
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-muted/40 px-3 py-2 rounded-lg transition-colors" onClick={toggleDropdown}>
        {/* Left - Profile Picture or Initials */}
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#0EA5E9] to-[#010066] flex items-center justify-center text-white font-semibold text-sm">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`${user.firstName} ${user.lastName}`} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user.firstName, user.lastName)
          )}
        </div>

        {/* Center - User Full Name and Email */}
        <div className="hidden lg:flex flex-col leading-tight">
          <span className="font-medium text-sm ">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs ">
            {user.email}
          </span>
        </div>

        {/* Right - Dropdown Arrow */}
        <div className="ml-1 hidden md:flex">
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Popup */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background rounded-lg shadow-lg border border-gray-100 py-2 z-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium ">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs truncate">
              {user.email}
            </p>
          </div>
          
          <div className="">
            <button className="w-full text-left px-4 py-2 text-sm  hover:bg-accent transition-colors flex items-center gap-3 border-b border-gray-100">
              <BadgeCheck className="size-4" />
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-3 border-b border-gray-100">
              <Settings className="size-4" />
              Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-3">
              <HelpCircle className="size-4" />
              Help
            </button>
          </div>
          
          <div className="border-t border-gray-100 ">
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-accent transition-colors flex items-center gap-3">
              <LogOut className="size-4 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav