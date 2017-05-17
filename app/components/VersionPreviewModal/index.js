/**
*
* VersionPreviewModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/php';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';
import { FormattedMessage } from 'react-intl';
import Diff from 'react-diff';
import commonMessages from 'messages';
// import styled from 'styled-components';


class VersionPreviewModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  supportedLanguages = {
    java: true,
    php: true,
    javascript: true,
    python: true,
  };

  render() {
    const { show, item, selectedVersion, latestVersion, onHide, onVersionCheckout } = this.props;
    const environment = item.environment.toLowerCase();
    const mode = environment in this.supportedLanguages ? environment : 'javascript';

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Preview version #{selectedVersion.index}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            <FormattedMessage {...commonMessages.code} />
          </h3>
          <AceEditor
            mode={mode}
            theme="github"
            name="FunctionPreviewForm"
            value={selectedVersion.code}
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="400px"
            readOnly={Boolean(true)}
          />
          <h3>
            <FormattedMessage {...commonMessages.diff} />
          </h3>
          <Diff inputA={selectedVersion.code} inputB={latestVersion.code} type="json" />
        </Modal.Body>
        <Modal.Footer>
          <a className="btn btn-primary" onClick={() => onVersionCheckout(selectedVersion)}>
            <FormattedMessage {...commonMessages.checkout} />
          </a>
          <a className="btn btn-default" onClick={onHide}>
            <FormattedMessage {...commonMessages.cancel} />
          </a>
        </Modal.Footer>
      </Modal>
    );
  }
}

VersionPreviewModal.propTypes = {
  show: React.PropTypes.bool,
  item: React.PropTypes.object,
  selectedVersion: React.PropTypes.object,
  latestVersion: React.PropTypes.object,
  onVersionCheckout: React.PropTypes.func,
  onHide: React.PropTypes.func,
};

export default VersionPreviewModal;
