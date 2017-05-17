/**
*
* FunctionVersionForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
import Item from './item';

class FunctionVersionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { versions, onPreview } = this.props;
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage {...commonMessages.version} /></th>
              <th><FormattedMessage {...commonMessages.time} /></th>
              <th><FormattedMessage {...commonMessages.action} /></th>
            </tr>
          </thead>
          <tbody>
            {
              versions.map((item, index) => (
                <Item
                  version={item}
                  key={`versions-${index}`}
                  onPreview={() => { onPreview(item); }}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

FunctionVersionForm.propTypes = {
  versions: React.PropTypes.array,
  onPreview: React.PropTypes.func,
};

export default FunctionVersionForm;
