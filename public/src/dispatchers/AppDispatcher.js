import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  handleAction(action) {
    this.dispatch({
      source: 'ACTION',
      action: action
    });
  }
}

export default new AppDispatcher();
