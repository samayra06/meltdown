import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export const submitMeltdown = async (data: any) => {
  return await addDoc(collection(db, "meltdowns"), {
    ...data,
    timestamp: serverTimestamp()
  });
};

export const fetchMeltdowns = async () => {
  const q = query(collection(db, "meltdowns"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addReplyToMeltdown = async (meltdownId: string, replyText: string) => {
  return await addDoc(collection(db, `meltdowns/${meltdownId}/replies`), {
    text: replyText,
    timestamp: serverTimestamp()
  });
};
