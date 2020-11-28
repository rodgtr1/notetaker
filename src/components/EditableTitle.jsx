import React, { Component } from 'react'

class EditableTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      type: props.type || 'text',
      value: props.value || 'Your Title',
      editClassName: props.editClassName,
      edit: false
    }
  }
  edit() {
    this.setState({ edit: this.edit !== false })
  }
  render() {
    return (
      (this.state.edit === true && (
        <input
          style={{ border: 'none' }}
          autoFocus
          name={this.state.name}
          type={this.state.type}
          value={this.state.value}
          className={this.state.editClassName}
          onFocus={event => {
            const value = event.target.value
            event.target.value = ''
            event.target.value = value
            this.setState({ backup: this.state.value })
          }}
          onChange={event => {
            this.setState({ value: event.target.value })
          }}
          onBlur={event => {
            this.setState({ edit: false })
          }}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              this.setState({ edit: false, value: this.state.backup })
            }
          }}
        />
      )) || (
        <span
          onClick={event => {
            this.setState({ edit: this.state.edit !== true })
          }}
        >
          {this.state.value}
        </span>
      )
    )
  }
}

export default EditableTitle
