import { Container } from "unstated";

type State = {
  isModalVisible: boolean,
};

export default class PostDetailScreenStore extends Container<State> {
  state = {
    isModalVisible: false
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
}
