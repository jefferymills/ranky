var Auth = {
  componentDidMount: function() {
    if(!localStorage.getItem('jwt')) {
      this.transitionTo('/login');
    }
  }
}

module.exports = Auth;
