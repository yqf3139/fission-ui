/**
*
* ServiceCatalogClassesForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
import messages from './messages';
import Item from './item';

class ServiceCatalogClassesForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { items } = this.props;
    return (
      <div>
        <h3><FormattedMessage {...messages.headerhttptrigger} /></h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage {...commonMessages.name} /></th>
              <th><FormattedMessage {...commonMessages.brokerName} /></th>
              <th><FormattedMessage {...commonMessages.description} /></th>
              <th><FormattedMessage {...commonMessages.plan} /></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => (
                <Item item={item} key={`items-${index}`} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

ServiceCatalogClassesForm.propTypes = {
  items: React.PropTypes.array,
};

export default ServiceCatalogClassesForm;
