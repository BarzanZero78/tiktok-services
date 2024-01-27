import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const EditUserMoneyForm = ({
  userDetails,
  showEditUserMoney,
  setShowEditUserMoney,
}) => {
  const { editUserMoney } = useAuth();
  const [editedUserMoney, setEditedUserMoney] = useState(0);

  const hanldeEditUserMoney = async (e) => {
    e.preventDefault();

    try {
      const updatedUserMoneyValue = userDetails.userMoney + editedUserMoney;

      await editUserMoney(userDetails.userId, updatedUserMoneyValue);

      setEditedUserMoney("");
      setShowEditUserMoney(false);

      alert(`Edited ${userDetails.userName} money`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowEditUserMoney(!showEditUserMoney)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm font-sans"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white w-[300px] h-[250px] rounded-lg p-2 flex flex-col justify-center items-center gap-5"
      >
        <button
          onClick={() => setShowEditUserMoney(!showEditUserMoney)}
          className="mr-0 ml-auto hover:text-[#FFF] text-[#C5C5C5] transition ease-in-out duration-300 active:scale-95"
        >
          <span className="material-icons">close</span>
        </button>

        <h3 className="text-lg">
          Edit <span className="font-bold">{userDetails.userName}</span> money
        </h3>

        <form
          onSubmit={hanldeEditUserMoney}
          className="flex flex-col justify-center items-center gap-3"
        >
          <p>{userDetails.userMoney} IQD</p>

          <input
            type="number"
            placeholder="User Money"
            value={editedUserMoney}
            onChange={(e) => setEditedUserMoney(parseInt(e.target.value, 10))}
            required
            className="w-[250px] p-2 bg-black/90 border border-[#C5C5C5]/15 rounded-lg focus:outline-none"
          />

          <button className="bg-[#212121] w-[250px] p-2 rounded-xl active:scale-95">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserMoneyForm;
