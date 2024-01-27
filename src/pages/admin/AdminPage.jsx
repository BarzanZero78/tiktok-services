import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SideBar from '../../components/admin/SideBar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminPage = () => {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  }


  return (
    <div className='text-white'>
      {userData ? (
        <div>
        {userData.isAdmin === true ? (
          <div className='flex gap-56'>

            <div className='flex-1'>
              <SideBar />
            </div>

            <div className='flex-auto'>
              <AdminHeader userData={userData} />
            </div>

          </div>
        ) : <>404 Not found</>}
        </div>
      ) : <>Loading...</>}
    </div>
  )
}

export default AdminPage
