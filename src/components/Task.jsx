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
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
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

  render() {
    const { data, onRemove, hasFinished } = this.props;
    const { id, title } = data;
    
    return (
      <div className="task">
        <input type="checkbox" onChange={this.handleCheckbox} checked={hasFinished} />
        <span className="title">{title}</span>
        <button type="button" onClick={() => onRemove(id)}>Remover</button>
      </div>
    );
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