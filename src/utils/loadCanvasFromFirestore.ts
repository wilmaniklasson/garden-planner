import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Konva from "konva";
import useStageStore from "../store/seStageStore";

// Function to load the canvas from Firestore
const loadCanvasFromFirestore = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  try {
    // get the document from Firestore
    const docRef = doc(db, "canvas-storage", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { designData } = docSnap.data(); // Get the design data (JSON) from Firestore

      if (!designData) {
        console.error("No design data found in Firestore!");
        return;
      }

      // Access the setStage function from Zustand store
      const { setStage } = useStageStore.getState();

      // Create a new Konva stage from the design data
      const container = document.getElementById("canvas-wrapper");
      if (!container) {
        console.error("Canvas container not found!");
        return;
      }

      const newStage = Konva.Node.create(designData, container);

      // Uppdate the stage in Zustand store
      setStage(newStage);

      console.log("Canvas loaded successfully from Firestore!");
    } else {
      console.log("No saved canvas found!");
    }
  } catch (error) {
    console.error("Error loading canvas:", error);
  }
};

export default loadCanvasFromFirestore;
