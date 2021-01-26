class BaseComponent {
  constructor(props, root) {
    this.props = props;
    this.state = {};
    this.root = root;

    this.redraw();
  }

  getNode = () => this.root

  setProps = (props) => {
    this.props = { ...this.props, ...props };

    this.redraw();
  }

  setState = (state) => {
    this.state = { ...this.state, ...state };

    this.redraw();
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

  empty = () => {
    setTimeout(() => {
      this.root.empty();
    }, 0);
  }

  redraw = () => {
    setTimeout(() => {
      if (this.render) {
        if (this.preRender) {
          this.preRender();
        }

        this.root.empty();
        const html = this.render();
        this.root.append(html);

        if (this.postRender) {
          this.postRender();
        }
      }
    }, 0);
  }
}

export default BaseComponent;
