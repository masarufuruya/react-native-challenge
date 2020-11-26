import firebase from "firebase"

export type User = {
  id?: string
  name: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export const initialUser: User = {
  name: "",
  createdAt: firebase.firestore.Timestamp.now(),
  updatedAt: firebase.firestore.Timestamp.now(),
}
