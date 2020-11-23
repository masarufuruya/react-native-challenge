import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './config'

class Fire {
  constructor() {
    firebase.initializeApp(config)
  }

  createPost = async ({ name, description, photo, likeCount }) => {
    const createdAt = Date.now()
    this.postCollection.add({
      name,
      description,
      photo,
      likeCount,
      createdAt
    })
  }

  // TODO: 後で認証追加してユーザーコレクションのサブコレクションにする
  get postCollection() {
    return firebase.firestore().collection('posts')
  }
}

Fire.shared = new Fire()
export default Fire
