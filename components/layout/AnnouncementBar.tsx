// ==================================
// Announcement Bar Component
// ==================================
// Thin banner at the very top of the site.
// Shows promotional messages like "Free Shipping Over ₹999".

import { ANNOUNCEMENT_TEXT } from '@/lib/constants';

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-secondary text-center py-2 px-4">
      <p className="text-xs font-medium uppercase tracking-[0.05em]">
        {ANNOUNCEMENT_TEXT}
      </p>
    </div>
  );
}
