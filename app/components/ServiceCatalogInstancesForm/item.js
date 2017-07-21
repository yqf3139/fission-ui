/**
*
* ServiceCatalogClassesItemForm
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';

import commonMessages from 'messages';

class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { item, onRemove } = this.props;
    return (
      <tr>
        <td>{item.metadata.name}</td>
        <td>{item.spec.serviceClassName}</td>
        <td>{item.spec.planName}</td>
        <td>{item.spec.externalID}</td>
        <td>
          <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...commonMessages.delete} /></a>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object,
  onRemove: React.PropTypes.func,
};

export default Item;
