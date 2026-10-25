import React, { useRef, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  Tractor,
  Mail,
  MapPin,
  LogOut,
  UserPlus,
  LogIn,
  Settings,
  ChevronRight,
  Sparkles,
  Sprout,
  Check,
} from 'lucide-react';
import { AuthUser, UserRole } from '../../types/agriculture';

interface UserProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuthModal,
  onRoleSwitch,
  onLogout,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-2xl border border-[#cbd5c5] text-gray-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Header Profile Identity */}
      <div className="p-4 bg-[#143823] text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#2d6a4f] border-2 border-[#52b788] flex items-center justify-center text-base font-bold text-white shadow-md shrink-0">
            {currentUser.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold truncate leading-tight text-white">{currentUser.name}</h4>
              <span
                className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  currentUser.role === 'admin'
                    ? 'bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]'
                    : 'bg-[#52b788] text-[#143823] font-extrabold'
                }`}
              >
                {currentUser.role === 'admin' ? 'Administrator' : 'Farmer'}
              </span>
            </div>
            <p className="text-[11px] text-[#a7c5b2] truncate mt-0.5">{currentUser.email}</p>
            <p className="text-[10px] text-[#74c69d] truncate mt-0.5 font-medium">
              {currentUser.title} {currentUser.region ? `• ${currentUser.region}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Role Toggle Row */}
      <div className="p-3 bg-[#f8f9f6] border-b border-[#e1e6dc]">
        <div className="text-[10px] uppercase font-bold text-[#5f7464] tracking-wider mb-1.5">
          Active Perspective Switcher
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              onRoleSwitch('admin');
              onClose();
            }}
            className={`p-2 rounded-md border text-left flex items-center gap-2 transition-all ${
              currentUser.role === 'admin'
                ? 'bg-[#143823] text-white border-[#143823] shadow-xs'
                : 'bg-white text-gray-700 border-[#d8e0d4] hover:bg-[#f0f4ee]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#52b788]" />
            <div className="text-[11px] font-semibold">Admin View</div>
          </button>

          <button
            type="button"
            onClick={() => {
              onRoleSwitch('farmer');
              onClose();
            }}
            className={`p-2 rounded-md border text-left flex items-center gap-2 transition-all ${
              currentUser.role === 'farmer'
                ? 'bg-[#143823] text-white border-[#143823] shadow-xs'
                : 'bg-white text-gray-700 border-[#d8e0d4] hover:bg-[#f0f4ee]'
            }`}
          >
            <Tractor className="w-4 h-4 shrink-0 text-[#52b788]" />
            <div className="text-[11px] font-semibold">Farmer View</div>
          </button>
        </div>
      </div>

      {/* Account Navigation / Actions */}
      <div className="p-2 space-y-0.5 text-xs">
        <button
          type="button"
          onClick={() => {
            onOpenAuthModal('login');
            onClose();
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-[#f4f7f2] hover:text-[#143823] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <LogIn className="w-4 h-4 text-[#2d6a4f]" />
            <span className="font-medium">Switch User / Sign In</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>

        <button
          type="button"
          onClick={() => {
            onOpenAuthModal('register');
            onClose();
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-700 hover:bg-[#f4f7f2] hover:text-[#143823] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-4 h-4 text-[#2d6a4f]" />
            <span className="font-medium">Register New Operator Account</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Footer Log Out */}
      <div className="p-2.5 bg-[#fafbf9] border-t border-[#e1e6dc] flex items-center justify-between">
        <span className="text-[10px] text-gray-500">AgriVision Node v4.2</span>
        <button
          type="button"
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
