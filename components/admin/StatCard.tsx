// ==================================
// Stat Card Component
// ==================================
// A small card showing a single metric (e.g., "Today's Revenue: ₹12,450").
// Used on the dashboard page.

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-600">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>

        {/* Trend or subtitle */}
        {(trend && trendValue) ? (
          <div className="flex items-center gap-1 mt-1.5">
            {trend === 'up' && (
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
            )}
            {trend === 'down' && (
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 5.834 5.518l2.74 1.22m0 0-5.94 2.28m5.94-2.28-2.28-5.941" />
              </svg>
            )}
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
              {trendValue}
            </span>
          </div>
        ) : subtitle ? (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
