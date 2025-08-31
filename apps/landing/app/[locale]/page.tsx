export default function HomePage() {
  console.log('HomePage component rendered');
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">LND Boilerplate</h1>
      <p className="text-lg mb-4">Modern Web Development Framework</p>
      <p className="mb-6">Build scalable web applications with our comprehensive boilerplate featuring TypeScript, Next.js, and modern tooling.</p>
      <div className="flex gap-4">
        <a href="/docs/getting-started" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </a>
        <a href="/docs" className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
          View Documentation
        </a>
      </div>
    </div>
  );
}
