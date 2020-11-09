import { Container } from "unstated";

type State = {
  count: number,
};

export default class HomeScreenContainer extends Container<State> {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}
