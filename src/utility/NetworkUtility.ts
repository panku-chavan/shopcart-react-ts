import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserData = async (userUid: string) => {
  try {
    const userDocRef = doc(db, "users", userUid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("No user data found");
    }
  } catch (error: any) {
    console.error("Error fetching user data:", error.message || error);
    if (error.code === "permission-denied") {
      console.error("Check Firestore rules for access permissions.");
    } else if (error.code === "unavailable") {
      console.error("Firestore service is unavailable. Check your network.");
    }
    return null;
  }
};




const baseUrl='https://fakestoreapi.com';

export const neProductApi=`${baseUrl}/products`;
export const productDetailApi=`${baseUrl}/products/`;
export const categoriesApi=`${baseUrl}/products/categories`;
export const categoriesProductApi=`${baseUrl}/products/category`;


