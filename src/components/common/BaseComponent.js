class BaseComponent {
  constructor(props, root) {
    this.props = props;
    this.state = {};
    this.root = root;

    setTimeout(() => {
      if (this.render) {
        this.root.empty();
        this.render();
      }
    }, 0);
  }

  getNode = () => this.root

  setProps = (props) => {
    this.props = { ...this.props, ...props };

    setTimeout(() => {
      if (this.render) {
        this.root.empty();
        this.render();
      }
    }, 0);
  }

  setState = (state) => {
    this.state = { ...this.state, ...state };

    setTimeout(() => {
      if (this.render) {
        this.root.empty();
        this.render();
      }
    }, 0);
  }

  show = () => {
    this.root.show();
  }

  hide = () => {
    this.root.hide();
  }

  remove = () => {
    setTimeout(() => {
      this.root.remove();
    }, 0);
  }
}

export default BaseComponent;
