import React from "react";

const SignOutDialog = ({
  showSignOutDialog,
  setShowSignOuDialog,
  hanldleSignOut,
  t,
}) => {
  return (
    <div onClick={() => setShowSignOuDialog(!showSignOutDialog)} className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm">
      <div onClick={(event) => event.stopPropagation()} className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white w-[300px] h-[125px] rounded-lg flex flex-col justify-center items-center gap-4">

        <div className="">
            <h3 className="text-base">{t("Are you sure you want to logout?")}</h3>
        </div>

        <div className="flex flex-row-reverse justify-evenly items-center w-full p-2">

            <button onClick={hanldleSignOut} className="text-[#EE1D52] active:scale-95">بەڵێ</button>
            <button onClick={() => setShowSignOuDialog(!showSignOutDialog)} className="active:scale-95">نەخێر</button>

        </div>

      </div>
    </div>
  );
};

export default SignOutDialog;
