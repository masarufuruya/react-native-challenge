import { Container } from "unstated";

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
    collections.push(collection)
    this.setState({ collections })
  }
}
