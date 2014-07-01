/** @jsx React.DOM */
/*global React, DymModule, RwqModule, LocationModule*/
/* exported Messages*/
"use_strict";

React.initializeTouchEvents(true);

var Messages = React.createClass({

  render: function () {
    /**
     * Note: if there are a bunch of messages you want to display
     * Then may be you can create a new messageList Module which
     * creates multiple messages
     */
    var model = this.props.data[0];

    if (model.subtype === 'rwq') {
      return (
        <div className={"messages"}>
          <RwqModule model={model} />
        </div>
      );
    }
    if (model.subtype === 'dym') {
      return (
        <div className={"messages"}>
          <DymModule model={model} />
        </div>
      );
    }
    if (model.subtype === 'location') {
      return (
        <div className={"messages"}>
          <LocationModule model={model} />
        </div>
      );
    }
    //default will result in no rendering
    return <noscript />;
  }
});

if ("object" === typeof exports) {
  module.exports = Messages;
}
