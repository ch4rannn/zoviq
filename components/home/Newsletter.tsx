// ==================================
// Newsletter Section
// ==================================
// Email signup section — dark background, CTA to join the community.
// Visual-only for MVP. Emails are not stored anywhere yet.
// Real email collection can be added later via Shopify or Mailchimp.

'use client'; // Needs state for form handling

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // For now, just show success state.
    // In the future, integrate with Shopify Marketing or Mailchimp.
    setIsSubmitted(true);
    setEmail('');
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-secondary">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3">
          JOIN THE ZOVIQ COMMUNITY
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-8 max-w-md mx-auto">
          Get early access to new drops, exclusive deals, and style inspiration.
        </p>

        {isSubmitted ? (
          // Success state
          <div className="flex items-center justify-center gap-2 text-accent">
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
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-sm font-medium">
              You&apos;re in! Welcome to ZOVIQ.
            </span>
          </div>
        ) : (
          // Email form
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full h-12 px-4 bg-transparent border border-gray-700 text-secondary text-sm placeholder:text-gray-500 focus:border-accent focus:outline-none transition-colors"
              aria-label="Email address"
            />
            <Button
              type="submit"
              variant="accent"
              className="w-full sm:w-auto whitespace-nowrap h-12"
            >
              SUBSCRIBE
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
