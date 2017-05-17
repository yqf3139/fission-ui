/**
*
* FunctionDuplicateModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
// import styled from 'styled-components';


class FunctionDuplicateModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { show, onDuplicate, onHide, onChange } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Name the duplication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please rename the duplicated function</h4>
          <div className="form-group">
            <label htmlFor="funcName"><FormattedMessage {...commonMessages.name} /></label>
            <input type="text" className="form-control" id="funcName" name="duplicatedFuncName" onChange={onChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a className="btn btn-primary" onClick={onDuplicate}>
            <FormattedMessage {...commonMessages.deploy} />
          </a>
          <a className="btn btn-default" onClick={onHide}>
            <FormattedMessage {...commonMessages.cancel} />
          </a>
        </Modal.Footer>
      </Modal>
    );
  }
}

FunctionDuplicateModal.propTypes = {
  show: React.PropTypes.bool,
  onDuplicate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onHide: React.PropTypes.func,
};

export default FunctionDuplicateModal;
