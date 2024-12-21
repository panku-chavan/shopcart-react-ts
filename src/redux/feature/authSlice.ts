import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../firebase";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile
} from "firebase/auth";

// Define the initial state for authentication
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isNavigate:boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isNavigate:false,
};

// Slice for authentication state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
      state.isNavigate=true;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuthState(state) {
      state.error = null;
      state.loading = false;
      state.isNavigate=false;
    },
  },
});

// Export actions
export const { setLoading, setUser, setError, clearAuthState } = authSlice.actions;

// Firebase login with email and password
export const loginWithEmail = (email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(result.user));
  } catch (error: any) {
    const errorMessage = handleFirebaseError(error.code);
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Firebase register with email and password
export const registerWithEmail = (email: string, password: string,firstName:string,lastName:string,mobileNumber:number) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const user = result.user;
    await updateProfile(user, { displayName: `${firstName} ${lastName}` });
    dispatch(setUser(result.user));
  } catch (error: any) {
    const errorMessage = handleFirebaseError(error.code);
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Firebase login with Google
export const loginWithGoogle = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const result = await signInWithPopup(auth, googleProvider);
    dispatch(setUser(result.user));
  } catch (error: any) {
    const errorMessage = handleFirebaseError(error.code);
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Firebase logout
export const logout = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(clearAuthState());
  } catch (error: any) {
    const errorMessage = handleFirebaseError(error.code);
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Helper function to handle Firebase error codes
const handleFirebaseError = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "User not found. Please check your email or register.";
    case "auth/invalid-credential":
      return "User not found. Please check your email or register.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already in use. Please log in.";
    case "auth/invalid-email":
      return "Please provide a valid email address.";
    case "auth/network-request-failed":
      return "Network error. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
};

export default authSlice.reducer;
