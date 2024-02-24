import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SideBar from '../../components/admin/SideBar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className='text-white'>
      {user ? (
        <div>
        {user.isAdmin === true ? (
          <div className='flex gap-56'>

            <div className='flex-1'>
              <SideBar />
            </div>

            <div className='flex-auto'>
              <AdminHeader user={user} />
            </div>

          </div>
        ) : <>404 Not found</>}
        </div>
      ) : <>Loading...</>}
    </div>
  )
}

export default AdminPage
