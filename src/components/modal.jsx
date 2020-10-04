import React, { Component } from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';
import { UiMultiply } from 'vyaguta-icons/ui';

// Make sure to bind modal to your appElement
Modal.setAppElement('#root');

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverFlown: false,
    };
  }
  isOverFlown = el => {
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
  };

  componentDidMount() {
    this.setState({ isOverFlown: this.isOverFlown(this.el) });
  }

  render() {
    const {
      buttons,
      title,
      message,
      htmlContent,
      modalClose,
      onClose,
      withIcon,
    } = this.props;
    const { isOverFlown } = this.state;
    return (
      <React.Fragment>
        {withIcon && <div className="lf-modal__status-icon">{withIcon}</div>}
        <div className="lf-modal__content-wrapper">
          <div
            className={`lf-modal__header lf-modal__header--border ${
              isOverFlown ? 'lf-modal__header--border' : ''
              }`}
          >
            {modalClose && (
              <div className="lf-modal__close-icon">
                <UiMultiply
                  size={16}
                  onClick={() => {
                    modalClose();
                    onClose();
                  }}
                />
              </div>
            )}

            {title.type !== undefined ? (
              <div
                className={classnames('lf-modal__title', {
                  [`lf-modal__title--${title.type}`]: title.type,
                })}
              >
                {title.type}
              </div>
            ) : (
                
                  title.html ? <div className="lf-modal__title">{title.html}</div> : <div className="lf-modal__title">{title.text}</div>
                
              )}
          </div>
          {htmlContent && htmlContent !== undefined && (
            <div
              className={`lf-modal__body ${isOverFlown ? 'pt-5x' : 'pt-5x'}`}
              ref={ref => {
                this.el = ref;
              }}
            >
              {htmlContent}
            </div>
          )}

          {message && message !== undefined && (
            <div className="lf-modal__body">
              <p className="lf-modal__info">{message}</p>
            </div>
          )}

          {buttons && (
            <div className={`lf-modal__footer `}>
              {buttons.map((value, index) => {
                const btnTheme =
                  value.type === undefined ? 'primary' : value.type;
                return (
                  <button
                    key={`btn-${index}`}
                    className={classnames(
                      'btn btn--large',
                      `btn--${btnTheme}`,
                      value.className
                    )}
                    onClick={() => {
                      modalClose();
                      value.onClick && value.onClick();
                    }}
                    disabled={value.disabled}
                  >
                    {value.text}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export class LFModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isError: false,
    };
  }

  showModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen, isError } = this.state;
    const {
      btnType,
      btnLabel,
      onClose,
      title,
      TriggerBtn,
      modalStatusIcon,
      buttons,
      message,
      htmlContent,
      closeButton,
      isAutoTrigger,
    } = this.props;

    if (isAutoTrigger && !isError) {
      this.showModal();
      this.setState({
        isError: true,
      });
    }
    if (!isAutoTrigger && isError) {
      this.setState({
        isError: false,
      });
    }

    return (
      <React.Fragment>
        {TriggerBtn ? (
          <TriggerBtn onClick={this.showModal} />
        ) : (
            <button
              className={classnames('btn', { [`btn--${btnType}`]: btnType })}
              onClick={this.showModal}
            >
              {btnLabel}
            </button>
          )}

        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          className="lf-modal"
          overlayClassName="lf-modal__overlay"
        >
          <CustomModal
            title={title}
            buttons={buttons}
            message={message}
            onClose={onClose ? onClose : this.closeModal}
            htmlContent={htmlContent}
            modalClose={closeButton ? this.closeModal : ''}
            withIcon={modalStatusIcon ? modalStatusIcon : ''}
          />
        </Modal>
      </React.Fragment>
    );
  }
}
