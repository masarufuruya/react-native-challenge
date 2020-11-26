import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { Collection } from '../stores/CollectionsStore'
import { config } from './config'

/* types */
import { User, initialUser } from '../types/user';

class Fire {
  constructor() {
    firebase.initializeApp(config)
  }

  createPost = async ({ name, description, photo, likeCount }) => {
    const createdAt = Date.now()
    // ドキュメント追加 (IDは自動採番)
    this.postCollectionReference.add({
      name,
      description,
      photo,
      likeCount,
      createdAt
    })
  }

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

  getPosts = async () => {
    // getすることで実態となるSnapshotを取得できる
    // getは非同期に実行されるのでawaitで実行する
    // CollectionReferenceへgetした時はQuerySnapshoptになる
    const postCollectionQuerySnapshot = await this.postCollectionReference.get()
    let posts = []
    // docsを取得する
    postCollectionQuerySnapshot.forEach(doc => {
      let post = doc.data()
      post.id = doc.id
      posts.push(post)
    })
    return posts
  }

  get db() {
    return firebase.firestore()
  }

  // TODO: 後で認証追加してユーザーコレクションのサブコレクションにする
  get postCollectionReference() {
    // CollectionReference(パス情報)を取得
    // 追加・更新・削除の処理はReferenceに対して行う
    return firebase.firestore().collection('posts')
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

Fire.shared = new Fire()
export default Fire
