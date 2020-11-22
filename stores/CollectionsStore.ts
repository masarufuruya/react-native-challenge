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

export default class CollectionsStore extends Container<State> {
  state = {
    collections: []
  }

  addCollection = (collection: Collection) => {
    if (collection.name === "" || collection.description === "") return
    let collections = [...this.state.collections]

    collection.likeCount = 0
    Fire.shared.createPost(collection)

    collections.push(collection)
    this.setState({ collections })
  }

  updateCollection = (collection: Collection) => {
    const {
      collections
    } = this.state
    // TODO: firestoreのIDから取得するように実装
    // nameで引いているのでnameは変更しないように注意
    const collectionIndex = collections.findIndex(item => item.name === collection.name)

    let newCollections: Array<Collection> = [...collections]
    let newCollection: Collection = newCollections[collectionIndex]
    newCollection.name = collection.name
    newCollection.description = collection.description
    newCollection.photo = collection.photo
    newCollections[collectionIndex] = newCollection

    this.setState({ collections: newCollections })
  }

  likeCollection = (name: string) => {
    const {
      collections
    } = this.state
    // TODO: firestoreのIDから取得するように実装
    const collectionIndex = collections.findIndex(item => item.name === name)

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
