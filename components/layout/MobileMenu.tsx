// ==================================
// Mobile Menu Component
// ==================================
// Slide-out navigation for mobile devices.
// Opens from the left, covers full screen with overlay.

'use client'; // This component needs browser APIs (state, click handlers)

import { useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS, FOOTER_LINKS, SITE_NAME } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup: restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Dark overlay behind the menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out menu panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-secondary z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with brand name and close button */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <span className="text-lg font-extrabold tracking-[0.08em]">
            {SITE_NAME}
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            {/* X icon */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Main navigation links */}
        <nav className="p-5">
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-lg font-medium text-primary hover:text-gray-500 transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Secondary links */}
          <ul className="space-y-3">
            {FOOTER_LINKS.help.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {FOOTER_LINKS.info.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
