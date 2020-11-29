import { Container } from "unstated"
import { createPost, getPosts, updateLikeCount, updatePost } from '../utils/Fire';

export type Collection = {
  id: string,
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

  initializeCollectionsStore = async (userId: string) => {
    const collections = await getPosts(userId)

    this.setState({ collections })
  }

  addCollection = (userId: string, collection: Collection) => {
    if (collection.name === "" || collection.description === "") return
    let collections = [...this.state.collections]

    // Firebaseへ登録
    collection.likeCount = 0
    createPost(userId, collection)

    collections.push(collection)
    this.setState({ collections })
  }

  updateCollection = async (userId: string, collection: Collection) => {
    const {
      collections
    } = this.state

    await updatePost(userId, collection)

    const collectionIndex = collections.findIndex(item => item.id === collection.id)
    let newCollections: Array<Collection> = [...collections]
    let newCollection: Collection = newCollections[collectionIndex]
    newCollection.name = collection.name
    newCollection.description = collection.description
    newCollection.photo = collection.photo
    newCollections[collectionIndex] = newCollection

    this.setState({ collections: newCollections })
  }

  likeCollection = async (userId: string, id: string) => {
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

    await updateLikeCount(userId, id, collection.likeCount)

    let newCollections = [...collections]
    newCollections[collectionIndex] = collection

    this.setState({ collections: newCollections })
  }
}
