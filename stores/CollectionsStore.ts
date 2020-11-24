import { Container } from "unstated"
import Fire from "../utils/Fire"

export type Collection = {
  name: string,
  description: string,
  photo: string,
  likeCount: number,
}

type State = {
  collections: Array<Collection>,
};

// 非同期処理はStore内で行う

export default class CollectionsStore extends Container<State> {
  state = {
    collections: []
  }

  initializeCollectionsStore = async () => {
    // Firebaseから取得
    // asyncはPromiseを返すのでawaitで結果を受け取る
    const collections = await Fire.shared.getPosts()

    this.setState({ collections })
  }

  addCollection = (collection: Collection) => {
    if (collection.name === "" || collection.description === "") return
    let collections = [...this.state.collections]

    // Firebaseへ登録
    collection.likeCount = 0
    Fire.shared.createPost(collection)

    collections.push(collection)
    this.setState({ collections })
  }

  updateCollection = (collection: Collection) => {
    const {
      collections
    } = this.state
    const collectionIndex = collections.findIndex(item => item.id === collection.id)

    let newCollections: Array<Collection> = [...collections]
    let newCollection: Collection = newCollections[collectionIndex]
    newCollection.name = collection.name
    newCollection.description = collection.description
    newCollection.photo = collection.photo
    newCollections[collectionIndex] = newCollection

    this.setState({ collections: newCollections })
  }

  likeCollection = (id: string) => {
    const {
      collections
    } = this.state
    const collectionIndex = collections.findIndex(item => item.id === id)

    let collection = collections[collectionIndex]
    if (collection.likeCount > 0) {
      collection.likeCount = collection.likeCount + 1
    } else {
      collection.likeCount = 1
    }
    let newCollections = [...collections]
    newCollections[collectionIndex] = collection

    this.setState({ collections: newCollections })
  }
}
