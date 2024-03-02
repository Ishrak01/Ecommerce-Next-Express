
"use client"
import { useGetProfileQuery, useUpdateProfileMutation, } from '@/app/redux/features/auth/authApi';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const ProfilePage = () => {

  const router=useRouter()
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")


  const { data: userProfile, error, isLoading } = useGetProfileQuery();
  const [updateProfile, { data:updatedProfile }] = useUpdateProfileMutation();



  useEffect(()=>{
    if(userProfile){
      setName(userProfile.name)
      setEmail(userProfile.email)
      setPhone(userProfile.phone)
      setAddress(userProfile.address)
      

    }
  },[userProfile])
  

  const handleUpdate = (e) => {
    e.preventDefault();
  
    updateProfile({
      
      data: {
        name,
        email,
        phone,
        address,
      },
    });
  };


  
  

  useEffect(() => {
    if (updatedProfile) {
      toast.success('Successfully profile updated!');
      
      // Reload the page
      window.location.reload();
    }
  }, [updatedProfile]);
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>

        {isLoading && <p>Loading profile...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        
        {!isEditing && userProfile && (
          <div>
            <p className="text-lg mb-2">
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Phone:</strong> {userProfile.phone}
            </p>
            <p className="text-lg mb-2">
              <strong>Address:</strong> {userProfile.address}
            </p>
          </div>
        )}

        {isEditing && userProfile && (
          <form onSubmit={handleUpdate}>
            {/* Repeat similar structure for other fields: email, phone, address, password */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            {/* Repeat similar structure for other fields: email, phone, address, password */}
            
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded-md ml-2"
            >
              Cancel
            </button>
          </form>
        )}

        <hr />
        <br />
        <button className="border border-bg-green-500" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;