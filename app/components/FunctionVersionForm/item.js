/**
*
* TriggerHttpItemForm
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
// import styled from 'styled-components';


class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { version, onPreview } = this.props;
    return (
      <tr>
        <td>{version.index}</td>
        <td>{new Date(version.timestamp * 1000).toLocaleString()}</td>
        <td>
          <a className="btn btn-primary" onClick={onPreview}>
            <FormattedMessage {...commonMessages.preview} />
          </a>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  version: React.PropTypes.object,
  onPreview: React.PropTypes.func,
};

export default Item;
