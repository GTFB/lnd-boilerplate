export default function TestPage() {
  console.log('TestPage component rendered');
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Localized Test Page</h1>
      <p>This is a test page to check if routing works inside the [locale] segment.</p>
      <p>If you can see this, the routing is working correctly!</p>
    </div>
  );
}
