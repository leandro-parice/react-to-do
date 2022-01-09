import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
        id: data.id,
        hasFinished: false,
        editMode: false,
        title: data.title,
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleCheckbox(event) {
    const { onUpdate } = this.props;
    const currentState = this.state;

    this.setState({
        hasFinished: event.target.checked,
    })

    onUpdate({
        ...currentState,
        hasFinished: event.target.checked,
    });
  }

  handleClick() {
    this.setState({
      editMode: true
    });
  };

  handleKeydown(event) {
    if (event.keyCode === 13 || event.charCode === 13) {
      // enter key
      this.handleBlur(event);
    } else if (event.keyCode === 27 || event.charCode === 27) {
      // esc key
      this.handleBlur(event, false);
    }
  }

  handleFocus(event) {
    if (event.target.type === 'text') {
      const size = event.target.value.length;
      event.target.setSelectionRange(0, size);
    }
  };

  handleBlur(event, save = true) {
    const title = event.target.value
    const { onUpdate } = this.props;
    const currentState = this.state;

    if(save) {
      this.setState({
        editMode: false,
        title: title,
      });
  
      onUpdate({
          ...currentState,
          title: title,
          editMode: false,
      });
    } else {
      this.setState({
        editMode: false,
      });
  
      onUpdate({
          ...currentState,
          editMode: false,
      });
    }

  }

  render() {
    const { data, onRemove, hasFinished } = this.props;
    const { id, title } = data;
    const { editMode } = this.state;

    if(editMode){
      return (
        <div className="task">
          <input type="checkbox" onChange={this.handleCheckbox} checked={hasFinished} />
          
          <input
            type="text"
            className="title"
            defaultValue={title}
            onKeyDown={this.handleKeydown}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            autoFocus />
          <button type="button" onClick={() => onRemove(id)}>Remover</button>
        </div>
      );
    } else {
      return (
        <div className="task">
          <input type="checkbox" onChange={this.handleCheckbox} checked={hasFinished} />
          
          <span className="title" onClick={this.handleClick}>{title}</span>
          <button type="button" onClick={() => onRemove(id)}>Remover</button>
        </div>
      );
    }
  }
}

Task.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
  hasFinished: PropTypes.bool,
}.isRequired;