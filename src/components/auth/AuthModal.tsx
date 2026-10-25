import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Tractor,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Sprout,
  Sparkles,
} from 'lucide-react';
import { AuthUser, UserRole, CropType } from '../../types/agriculture';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('e.vance@agrivision.gov');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('farmer');
  const [regFarmName, setRegFarmName] = useState('');
  const [regRegion, setRegRegion] = useState('District 4 - West Valley');
  const [regCrop, setRegCrop] = useState<CropType>('Corn / Maize');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Feedback error/success
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // Determine user profile based on email or default to Eleanor / Marcus
    const isFarmer =
      loginEmail.toLowerCase().includes('farmer') ||
      loginEmail.toLowerCase().includes('henderson') ||
      loginEmail.toLowerCase().includes('crestfarms');

    const authenticatedUser: AuthUser = isFarmer
      ? {
          id: 'user-farmer',
          name: 'Marcus Henderson',
          email: loginEmail,
          role: 'farmer',
          title: 'Henderson Crest Farm',
          farmName: 'Henderson Crest Farm',
          region: 'District 4 - West Valley',
          primaryCrop: 'Corn / Maize',
          avatarInitials: 'MH',
        }
      : {
          id: 'user-admin',
          name: 'Eleanor Vance',
          email: loginEmail,
          role: 'admin',
          title: 'Operations Director',
          region: 'District 4 - West Valley',
          avatarInitials: 'EV',
        };

    onLoginSuccess(authenticatedUser);
    onClose();
  };

  const handleQuickDemoLogin = (roleToLogin: UserRole) => {
    if (roleToLogin === 'admin') {
      onLoginSuccess({
        id: 'user-admin',
        name: 'Eleanor Vance',
        email: 'e.vance@agrivision.gov',
        role: 'admin',
        title: 'Operations Director',
        region: 'District 4 - West Valley',
        avatarInitials: 'EV',
      });
    } else {
      onLoginSuccess({
        id: 'user-farmer',
        name: 'Marcus Henderson',
        email: 'm.henderson@crestfarms.org',
        role: 'farmer',
        title: 'Henderson Crest Farm',
        farmName: 'Henderson Crest Farm',
        region: 'District 4 - West Valley',
        primaryCrop: 'Corn / Maize',
        avatarInitials: 'MH',
      });
    }
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    const initials = regName
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'AG';

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      role: regRole,
      title: regRole === 'admin' ? 'Operations Officer' : (regFarmName || 'Family Farm'),
      farmName: regRole === 'farmer' ? regFarmName || 'Registered Farm' : undefined,
      region: regRegion,
      primaryCrop: regRole === 'farmer' ? regCrop : undefined,
      avatarInitials: initials,
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-[#FFFFFF] rounded-xl border border-[#E3E9E3] shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#123D2B] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#216847] border border-[#DDEDE1]/30 flex items-center justify-center text-[#DDEDE1] shadow-inner">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">AgriVision Account</h3>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#216847] text-[#DDEDE1]">
                  Auth
                </span>
              </div>
              <p className="text-xs text-[#DDEDE1]/80">Smart Agriculture Management Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#DDEDE1]/70 hover:text-white hover:bg-[#0C3021] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-[#E3E9E3] bg-[#EFF6F0] shrink-0">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-[#216847] text-[#123D2B] bg-[#FFFFFF]'
                : 'border-transparent text-[#64746A] hover:text-[#123D2B]'
            }`}
          >
            Sign In to Console
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-[#216847] text-[#123D2B] bg-[#FFFFFF]'
                : 'border-transparent text-[#64746A] hover:text-[#123D2B]'
            }`}
          >
            Register Operator Account
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#26372E]">
          {errorMessage && (
            <div className="p-2.5 rounded bg-[#FCE8E6] border border-[#B42318]/30 text-[#B42318] text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64746A] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64746A] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="operator@agrivision.gov"
                    className="w-full pl-9 pr-3 py-2 bg-[#F7F8F3] border border-[#E3E9E3] rounded-md text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847] focus:border-[#216847]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#64746A]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-[10px] text-[#216847] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64746A] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-9 py-2 bg-[#F7F8F3] border border-[#E3E9E3] rounded-md text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847] focus:border-[#216847]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-[#64746A] hover:text-[#123D2B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#26372E]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#216847] rounded"
                  />
                  <span>Remember this workstation</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#216847] hover:bg-[#18573A] text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Sign In to System</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-3 border-t border-[#E3E9E3] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64746A] block text-center">
                  Or Instant 1-Click Demo Access
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2.5 rounded-lg border border-[#DDEDE1] bg-[#EFF6F0] hover:bg-[#E4F4E8] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#123D2B]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#216847]" />
                      <span>Eleanor Vance</span>
                    </div>
                    <p className="text-[10px] text-[#64746A] mt-0.5">Admin (Director)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('farmer')}
                    className="p-2.5 rounded-lg border border-[#DDEDE1] bg-[#EFF6F0] hover:bg-[#E4F4E8] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#123D2B]">
                      <Tractor className="w-3.5 h-3.5 text-[#216847]" />
                      <span>Marcus H.</span>
                    </div>
                    <p className="text-[10px] text-[#64746A] mt-0.5">Farmer (Crest Farm)</p>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64746A] mb-1">
                  Full Name / Operator Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#64746A] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g., Sarah Chen-Miller"
                    className="w-full pl-9 pr-3 py-2 bg-[#F7F8F3] border border-[#E3E9E3] rounded-md text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847] focus:border-[#216847]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64746A] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64746A] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="sarah@verdanthorizon.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#F7F8F3] border border-[#E3E9E3] rounded-md text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847] focus:border-[#216847]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64746A] mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64746A] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-3 py-2 bg-[#F7F8F3] border border-[#E3E9E3] rounded-md text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847] focus:border-[#216847]"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64746A] mb-1.5">
                  Select Operating Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      regRole === 'admin'
                        ? 'border-[#216847] bg-[#E4F4E8] ring-1 ring-[#216847]'
                        : 'border-[#E3E9E3] bg-[#FFFFFF] hover:bg-[#EFF6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#123D2B]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#216847]" />
                      <span>Administrator</span>
                    </div>
                    <p className="text-[10px] text-[#64746A] mt-0.5">District authority & governance</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('farmer')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      regRole === 'farmer'
                        ? 'border-[#216847] bg-[#E4F4E8] ring-1 ring-[#216847]'
                        : 'border-[#E3E9E3] bg-[#FFFFFF] hover:bg-[#EFF6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#123D2B]">
                      <Tractor className="w-3.5 h-3.5 text-[#216847]" />
                      <span>Farm Operator</span>
                    </div>
                    <p className="text-[10px] text-[#64746A] mt-0.5">Field telemetry & irrigation</p>
                  </button>
                </div>
              </div>

              {/* Farmer Specific Fields */}
              {regRole === 'farmer' && (
                <div className="p-3 bg-[#EFF6F0] rounded-md border border-[#DDEDE1] space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-[#64746A] mb-1">
                      Farm / Cooperative Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regFarmName}
                      onChange={(e) => setRegFarmName(e.target.value)}
                      placeholder="e.g., Verdant Horizon Organics"
                      className="w-full px-2.5 py-1.5 bg-[#FFFFFF] border border-[#E3E9E3] rounded text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#64746A] mb-1">
                        Region District
                      </label>
                      <select
                        value={regRegion}
                        onChange={(e) => setRegRegion(e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#FFFFFF] border border-[#E3E9E3] rounded text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847]"
                      >
                        <option value="District 1 - East Basin">District 1 - East Basin</option>
                        <option value="District 2 - North Delta">District 2 - North Delta</option>
                        <option value="District 3 - South Plateau">District 3 - South Plateau</option>
                        <option value="District 4 - West Valley">District 4 - West Valley</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#64746A] mb-1">
                        Primary Crop
                      </label>
                      <select
                        value={regCrop}
                        onChange={(e) => setRegCrop(e.target.value as any)}
                        className="w-full px-2 py-1.5 bg-[#FFFFFF] border border-[#E3E9E3] rounded text-xs font-medium text-[#26372E] focus:outline-none focus:ring-1 focus:ring-[#216847]"
                      >
                        <option value="Corn / Maize">Corn / Maize</option>
                        <option value="Soybeans">Soybeans</option>
                        <option value="Winter Wheat">Winter Wheat</option>
                        <option value="Tomatoes">Tomatoes</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Alfalfa">Alfalfa</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 accent-[#216847] rounded"
                />
                <label htmlFor="agree-terms" className="text-[11px] text-[#64746A]">
                  I agree to the Agricultural Telemetry Data Protection and LoRa Sensor Node connection protocols.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#216847] hover:bg-[#18573A] text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#DDEDE1]" />
                <span>Complete Registration & Open Dashboard</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
