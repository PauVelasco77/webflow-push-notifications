import {PushNotifications} from "./components/push-notifications";

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='container mx-auto py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Tutellus Push Notifications</h1>
          <p className='text-lg text-gray-600'>Stay updated with the latest notifications from Tutellus</p>
        </div>

        <div className='flex justify-center'>
          <PushNotifications />
        </div>

        <div className='mt-8 max-w-2xl mx-auto'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-semibold mb-4'>About Push Notifications</h2>
            <div className='space-y-3 text-gray-600'>
              <p>
                Push notifications help you stay connected with important updates, even when you're not actively
                browsing our website.
              </p>
              <p>You'll receive notifications about:</p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Course updates and announcements</li>
                <li>New learning opportunities</li>
                <li>Important platform updates</li>
                <li>Personalized recommendations</li>
              </ul>
              <p className='text-sm'>You can unsubscribe at any time through your browser settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
