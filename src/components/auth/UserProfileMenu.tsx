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
      className="absolute right-0 mt-2 w-80 sm:w-88 bg-[#FFFFFF] rounded-xl shadow-2xl border border-[#E3E9E3] text-[#26372E] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Header Profile Identity */}
      <div className="p-4 bg-[#123D2B] text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#216847] border-2 border-[#DDEDE1]/30 flex items-center justify-center text-base font-bold text-white shadow-md shrink-0">
            {currentUser.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold truncate leading-tight text-white">{currentUser.name}</h4>
              <span
                className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  currentUser.role === 'admin'
                    ? 'bg-[#216847] text-[#DDEDE1] border border-[#DDEDE1]/20'
                    : 'bg-[#DDEDE1] text-[#123D2B] font-extrabold'
                }`}
              >
                {currentUser.role === 'admin' ? 'Administrator' : 'Farmer'}
              </span>
            </div>
            <p className="text-[11px] text-[#DDEDE1]/80 truncate mt-0.5">{currentUser.email}</p>
            <p className="text-[10px] text-[#DDEDE1] truncate mt-0.5 font-medium">
              {currentUser.title} {currentUser.region ? `• ${currentUser.region}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Role Toggle Row */}
      <div className="p-3 bg-[#EFF6F0] border-b border-[#E3E9E3]">
        <div className="text-[10px] uppercase font-bold text-[#64746A] tracking-wider mb-1.5">
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
                ? 'bg-[#123D2B] text-white border-[#123D2B] shadow-xs'
                : 'bg-[#FFFFFF] text-[#26372E] border-[#E3E9E3] hover:bg-[#F7F8F3]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#216847]" />
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
                ? 'bg-[#123D2B] text-white border-[#123D2B] shadow-xs'
                : 'bg-[#FFFFFF] text-[#26372E] border-[#E3E9E3] hover:bg-[#F7F8F3]'
            }`}
          >
            <Tractor className="w-4 h-4 shrink-0 text-[#216847]" />
            <div className="text-[11px] font-semibold">Farmer View</div>
          </button>
        </div>
      </div>

      {/* Account Navigation / Actions */}
      <div className="p-2 space-y-0.5 text-xs bg-[#FFFFFF]">
        <button
          type="button"
          onClick={() => {
            onOpenAuthModal('login');
            onClose();
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-lg text-[#26372E] hover:bg-[#EFF6F0] hover:text-[#123D2B] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <LogIn className="w-4 h-4 text-[#216847]" />
            <span className="font-medium">Switch User / Sign In</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64746A]" />
        </button>

        <button
          type="button"
          onClick={() => {
            onOpenAuthModal('register');
            onClose();
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-lg text-[#26372E] hover:bg-[#EFF6F0] hover:text-[#123D2B] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-4 h-4 text-[#216847]" />
            <span className="font-medium">Register New Operator Account</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64746A]" />
        </button>
      </div>

      {/* Footer Log Out */}
      <div className="p-2.5 bg-[#F7F8F3] border-t border-[#E3E9E3] flex items-center justify-between">
        <span className="text-[10px] text-[#64746A]">AgriVision Node v4.2</span>
        <button
          type="button"
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#B42318] hover:bg-[#FCE8E6] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
