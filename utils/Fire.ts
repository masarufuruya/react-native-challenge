import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { Collection } from '../stores/CollectionsStore'
import { config } from './config'

/* types */
import { User, initialUser } from '../types/user';

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

class Fire {
  updatePost = async (post: Collection) => {
    const postDocumentReference = this.db.collection('posts').doc(post.id)
    await postDocumentReference.update({
      name: post.name,
      description: post.description,
      photo: post.photo,
      likeCount: post.likeCount,
    })
  }

  updateLikeCount = async (id: string, likeCount: Number) => {
    const postDocumentReference = this.db.collection('posts').doc(id)
    await postDocumentReference.update({
      likeCount: likeCount,
    })
  }

  get db() {
    return firebase.firestore()
  }
}

export const signin = async () => {
  const userCredential = await firebase.auth().signInAnonymously()
  const { uid } = userCredential.user
  const userDoc = await firebase.firestore().collection("users").doc(uid).get()
  //ユーザー情報が作られていない場合は初期化
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser)
    return {
      ...initialUser,
      id: uid
    } as User
  } else {
    return {
      //firestoreのドキュメントのdataはIDを返さないので展開して返している
      id: uid,
      ...userDoc.data()
    } as User
  }
}

export const createPost = async (userId: string, collection: Collection) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("posts")
    .add(collection);
}

export const getPosts = async (userId: string) => {
  const postDocs = await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("posts")
    .orderBy("likeCount", "desc")
    .get()

  return postDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id })
  )
}

Fire.shared = new Fire()
export default Fire
