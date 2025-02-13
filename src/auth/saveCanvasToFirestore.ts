import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import useStageStore from '../store/seStageStore';

// Function to save the canvas to Firestore
const saveCanvasToFirestore = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  // Access the stage from Zustand store
  const { stage } = useStageStore.getState(); // Get the current stage

  if (!stage) {
    console.error("No canvas to save!");
    return;
  }

  const json = stage.toJSON(); // Convert the stage to JSON

  try {
    // Create a reference to the Firestore document in the 'canvas-storage' collection
    const docRef = doc(db, "canvas-storage", user.uid, "designs", "latestDesign");

    // Save the JSON data to Firestore
    await setDoc(docRef, { designData: json, timestamp: new Date() });

    console.log("Canvas saved to Firestore!");
  } catch (error) {
    console.error("Error during save:", error);
  }
};

export default saveCanvasToFirestore;
