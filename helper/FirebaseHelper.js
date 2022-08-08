import { serverTimestamp } from "@firebase/firestore"

export const addTimeStamp = function (obj) {
  return {
    ...obj,
    timestamp: serverTimestamp(),
  }
}
