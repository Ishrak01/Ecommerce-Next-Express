
const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

        {/* Your profile content goes here */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <p className="text-lg font-semibold">John Doe</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <p className="text-lg font-semibold">john.doe@example.com</p>
        </div>

        {/* Add more profile information as needed */}
      </div>
    </div>
  )
}

export default page