import React, { Component } from 'react'

export default class StartBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: true,
    };
  }
  handleClick = (e) => {
    this.setState({
      isStart: !this.state.isStart,
    });
    return this.state.isStart
      ? this.props.startTimer(e)
      : this.props.stopTimer(e);
  };

  render() {
    return (
      <div>
        {this.state.isStart ? (
          <button
            name={this.props.key1}
            value={this.props.task}
            onClick={this.handleClick}
            className="task-btn"
          >
            Start
          </button>
        ) : (
          <button
            name={this.props.key1}
            value={this.props.task}
            onClick={this.handleClick}
            className="task-btn"
          >
            Stop
          </button>
        )}
      </div>
    );
  }
}
