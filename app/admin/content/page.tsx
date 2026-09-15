// Homepage CMS page — coming soon placeholder
export const metadata = { title: 'Homepage CMS' };

export default function ContentPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Homepage Content Manager</h2>
      <p className="text-sm text-gray-500 max-w-md">
        Edit hero images, announcement bar text, brand statement, social links, and more.
        This feature will be connected to Supabase for content storage.
      </p>
    </div>
  );
}
