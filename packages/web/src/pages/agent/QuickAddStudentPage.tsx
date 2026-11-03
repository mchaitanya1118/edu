import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, Globe, Mail, Phone } from 'lucide-react';

interface CountryOption {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: CountryOption[] = [
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', dialCode: '+977' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', dialCode: '+886' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
];

export default function QuickAddStudent() {
  const navigate = useNavigate();
  const selectedCountry = countries[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) navigate(-1); }}>
      {/* Compact Modal */}
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Create New Student Profile</h2>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Enter basic details to assign this <span className="font-semibold text-blue-600">$18,692</span> package quote.</p>
            </div>
            <NavLink to="/agent/quote-drawer" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
              <X className="w-4 h-4" />
            </NavLink>
          </div>
        </div>

        {/* Form Body — Single Column Auto-Layout */}
        <div className="px-5 py-5 space-y-4">
          {/* 1. First Name & Last Name (2-col side-by-side) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold text-gray-600 mb-1.5">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="e.g. Wei"
                className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 placeholder:text-gray-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="e.g. Zhang"
                className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 placeholder:text-gray-300 transition-all"
              />
            </div>
          </div>

          {/* 2. Citizenship / Passport Country */}
          <div>
            <label htmlFor="citizenship" className="block text-xs font-semibold text-gray-600 mb-1.5">Citizenship / Passport Country</label>
            <select
              id="citizenship"
              className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 appearance-none cursor-pointer pr-9"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: '36px' }}
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>

          {/* 3. Student Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">Student Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="student@email.com"
                className="w-full h-10 pl-9 pr-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 placeholder:text-gray-300 transition-all"
              />
            </div>
          </div>

          {/* 4. Phone / WhatsApp Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1.5">Phone / WhatsApp Number</label>
            <div className="flex gap-2">
              <select
                className="h-10 w-24 shrink-0 px-2 py-2.5 text-xs border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', paddingRight: '18px' }}
              >
                {countries.map(c => (
                  <option key={c.code} value={c.dialCode}>{c.flag} {c.dialCode}</option>
                ))}
              </select>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="+86 138 0000 0000"
                  className="w-full h-10 pl-9 pr-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 5. Target Intake */}
          <div>
            <label htmlFor="intake" className="block text-xs font-semibold text-gray-600 mb-1.5">Target Intake</label>
            <select
              id="intake"
              className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 appearance-none cursor-pointer pr-9"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: '36px' }}
            >
              <option value="jan2027">January 2027 Intake</option>
              <option value="apr2027">April 2027 Intake</option>
              <option value="jul2027">July 2027 Intake</option>
              <option value="oct2027">October 2027 Intake</option>
              <option value="jan2028">January 2028 Intake</option>
            </select>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
            Save & Assign Package
            <Globe className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
