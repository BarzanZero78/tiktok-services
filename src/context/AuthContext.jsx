import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const UserAuth = createContext();

export const useAuth = () => {
  return useContext(UserAuth);
};

const UserAuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = () => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(
          db,
          "users",
          currentUser.phoneNumber || currentUser.uid
        );
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser(userData);
        }
      } else {
        setUser(null); // No authenticated user, set user state to null
      }

      setIsLoading(false);
    });
  };

  const createUserProfileIfNotExists = async (user) => {
    const userDoc = doc(db, "users", user.uid);
    const userOnSnapshot = await getDoc(userDoc);

    if (!userOnSnapshot.exists()) {
      const isAdmin = false;
      const userMoney = 0;
      const userMoneySpent = 0;
      const userAllOrders = 0;
      const userActiveOrders = 0;
      const lastUpdateTimestamp = Date.now();
      await setDoc(userDoc, {
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        userPhoneNumber: user.phoneNumber,
        isAdmin,
        userMoney,
        userMoneySpent,
        userAllOrders,
        userActiveOrders,
        userId: user.uid,
        lastUpdateTimestamp,
      });
    }
  };

  const googleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await createUserProfileIfNotExists(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const facebookSignIn = async () => {
    try {
      const fbProvider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, fbProvider);
      const user = result.user;
      await createUserProfileIfNotExists(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const editUserMoney = async (userId, updatedUserMoneyValue) => {
    try {
      const userDoc = doc(db, "users", userId);

      await updateDoc(userDoc, {
        userMoney: updatedUserMoneyValue,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return users;
    } catch (error) {
      console.log(error.message);
    }
  };

  const context = {
    isLoading,
    user,
    googleSignIn,
    facebookSignIn,
    signOutUser,
    editUserMoney,
    getUsers,
  };
  return <UserAuth.Provider value={context}>{children}</UserAuth.Provider>;
};

export default UserAuthProvider;
