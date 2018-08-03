/**
*
* ServiceCatalogBindingsForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import ServiceCatalogBindingCreateForm from 'components/ServiceCatalogBindingCreateForm';
import commonMessages from 'messages';
import messages from './messages';
import Item from './item';

class ServiceCatalogBindingsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { items, onRemove, onCreate } = this.props;
    return (
      <div>
        <h3><FormattedMessage {...messages.header} /></h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage {...commonMessages.name} /></th>
              <th><FormattedMessage {...commonMessages.instance} /></th>
              <th><FormattedMessage {...commonMessages.secret} /></th>
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
        <ServiceCatalogBindingCreateForm onCreate={onCreate} />
      </div>
    );
  }
}

ServiceCatalogBindingsForm.propTypes = {
  items: React.PropTypes.array,
  onRemove: React.PropTypes.func,
  onCreate: React.PropTypes.func,
};

export default ServiceCatalogBindingsForm;
