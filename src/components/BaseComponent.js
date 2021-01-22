class BaseComponent {
  constructor(props, root) {
    this.props = props;
    this.root = root;

    if (this.render) {
      this.render();
    }
  }

  getNode = () => this.root

  setProps = (props) => {
    this.props = { ...this.props, ...props };

    if (this.render) {
      this.render();
    }
  }

  show = () => {
    this.root.show();
  }

  hide = () => {
    this.root.hide();
  }

  remove = () => {
    this.root.remove();
  }
}

export default BaseComponent;
