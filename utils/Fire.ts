import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './config'

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

  // TODO: 後で認証追加してユーザーコレクションのサブコレクションにする
  get postCollectionReference() {
    // CollectionReference(パス情報)を取得
    // 追加・更新・削除の処理はReferenceに対して行う
    return firebase.firestore().collection('posts')
  }
}

Fire.shared = new Fire()
export default Fire
