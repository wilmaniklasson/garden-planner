import { useState } from "react";
import { db, setDoc, doc, getDoc } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Shape, loadImage } from "../utils/shapes";

export const useFirebaseCanvas = (setShapes: (shapes: Shape[]) => void) => {
  const [loading, setLoading] = useState(false);

  const saveCanvasToFirebase = async (shapes: Shape[]) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return console.log("No user is logged in");

      const shapesToSave = shapes.map(shape => ({
        ...shape,
        image: typeof shape.image === "string" ? shape.image : shape.image?.src || null
      }));

      await setDoc(doc(db, "canvas-storage", user.uid), { shapes: shapesToSave });
      console.log("Canvas saved!");
    } catch (error) {
      console.error("Error saving canvas: ", error);
    }
  };

  const loadCanvasFromFirebase = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return console.log("No user is logged in");

      const docRef = doc(db, "canvas-storage", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Canvas loaded!", data);

        if (data.shapes) {
          const shapesWithImages = await Promise.all(
            data.shapes.map(async (shape: Shape) => {
              if (shape.tool === "svg" && typeof shape.image === "string") {
                const img = await loadImage(shape.image);
                return { ...shape, image: img };
              }
              return shape;
            })
          );
          setShapes(shapesWithImages);
        }
      } else {
        console.log("No canvas data found for this user.");
      }
    } catch (error) {
      console.error("Error loading canvas: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { saveCanvasToFirebase, loadCanvasFromFirebase, loading };
};
