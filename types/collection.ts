import firebase from "firebase"

export type Collection = {
  id?: string
  name: string
  description: string
  photo: string
  likeCount: number
}

// export type Collection = {
//   id: string,
//   name: string,
//   description: string,
//   photo: string,
//   likeCount: number,
// }

export const initialUser: User = {
  name: "",
  createdAt: firebase.firestore.Timestamp.now(),
  updatedAt: firebase.firestore.Timestamp.now(),
}
