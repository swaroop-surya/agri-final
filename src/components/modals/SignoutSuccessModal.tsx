import React, { useEffect, useState } from 'react';
import { CheckCircle2, LogIn, ArrowRight, X, ShieldCheck, Sprout } from 'lucide-react';

interface SignoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInAgain: () => void;
  userName?: string;
  userTitle?: string;
}

export const SignoutSuccessModal: React.FC<SignoutSuccessModalProps> = ({
  isOpen,
  onClose,
  onSignInAgain,
  userName = 'Operator',
  userTitle = 'Operations Session',
}) => {
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(6);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E3E9E3] shadow-2xl max-w-md w-full overflow-hidden text-[#26372E] text-center p-6 sm:p-7 relative animate-in zoom-in-95 duration-200">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          aria-label="Close message"
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#64746A] hover:text-[#123D2B] hover:bg-[#EFF6F0] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E4F4E8] border-2 border-[#216847]/30 flex items-center justify-center text-[#216847] mx-auto mb-4 shadow-sm relative">
          <CheckCircle2 className="w-8 h-8 text-[#216847]" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#123D2B] text-white flex items-center justify-center text-[10px] shadow-xs">
            <Sprout className="w-3 h-3 text-[#DDEDE1]" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 id="signout-modal-title" className="text-xl font-bold text-[#123D2B] tracking-tight mb-1.5">
          Successfully Signed Out
        </h3>
        <p className="text-xs text-[#64746A] leading-relaxed mb-4">
          Your workstation session has been closed. Agricultural telemetry node authentication and regional credentials have been unlinked.
        </p>

        {/* Session Details Card */}
        <div className="bg-[#EFF6F0] border border-[#DDEDE1] rounded-xl p-3.5 mb-5 text-left flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#216847] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'AG'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#123D2B] truncate">{userName}</p>
              <p className="text-[11px] text-[#64746A] truncate">{userTitle}</p>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E4F4E8] text-[#216847] border border-[#216847]/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Disconnected</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSignInAgain();
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#216847] hover:bg-[#18573A] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In Again</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#FFFFFF] hover:bg-[#F7F8F3] text-[#123D2B] border border-[#E3E9E3] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore Home</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#64746A]" />
          </button>
        </div>

        {/* Auto dismiss countdown footer */}
        <div className="mt-4 pt-3 border-t border-[#E3E9E3] flex items-center justify-between text-[11px] text-[#64746A]">
          <span>Redirecting to Landing Page</span>
          <span className="font-semibold text-[#216847]">Auto-close in {countdown}s</span>
        </div>
      </div>
    </div>
  );
};
