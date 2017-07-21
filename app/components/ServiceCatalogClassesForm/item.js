/**
*
* ServiceCatalogClassesItemForm
*
*/

import React from 'react';
// import styled from 'styled-components';


class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { item } = this.props;
    return (
      <tr>
        <td>{item.metadata.name}</td>
        <td>{item.brokerName}</td>
        <td>{item.description}</td>
        <td>
          <ul>
            {
              item.plans.map((plan, index) => (
                <li key={`items-${index}`}>
                  <span className="label label-info">{plan.name}</span>{ ' ' }
                  {plan.description}{ ' ' }
                </li>
              ))
            }
          </ul>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object,
};

export default Item;
