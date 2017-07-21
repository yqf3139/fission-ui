/**
*
* ServiceCatalogBrokersForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import ServiceCatalogBrokerCreateForm from 'components/ServiceCatalogBrokerCreateForm';
import commonMessages from 'messages';
import messages from './messages';
import Item from './item';

class ServiceCatalogBrokersForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { items, onRemove, onCreate } = this.props;
    return (
      <div>
        <h3><FormattedMessage {...messages.headerhttptrigger} /></h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage {...commonMessages.name} /></th>
              <th><FormattedMessage {...commonMessages.url} /></th>
              <th><FormattedMessage {...commonMessages.action} /></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => (
                <Item item={item} key={`items-${index}`} onRemove={() => onRemove(item)} />
              ))
            }
          </tbody>
        </table>
        <ServiceCatalogBrokerCreateForm onCreate={onCreate} />
      </div>
    );
  }
}

ServiceCatalogBrokersForm.propTypes = {
  items: React.PropTypes.array,
  onRemove: React.PropTypes.func,
  onCreate: React.PropTypes.func,
};

export default ServiceCatalogBrokersForm;
