import React, { useState, useEffect } from 'react';

import { LFModal, Comment } from '../components';

export const Story = (props) => {
  const [autoTrigger, setAutoTrigger] = useState(true);

  useEffect(() => {
    setAutoTrigger(true);
  }, [props])

  const {url,title, kids = [] } = props.location.state.data || {};

  return (
    <>
      <LFModal
        title={
          {
            html: <>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </>
          }
        }
        closeButton
        isAutoTrigger={autoTrigger}
        onClose={() => {
          setAutoTrigger(false);
          props.history.push('/');
        }}
        htmlContent={
          <>
           {
             kids && kids.length > 0 ? (
              <>
              <p className="fs-body2 color-orange-20 mb-10x">Comments</p>
              {kids.map((id,key) => (
                <Comment id={id} key={key} />
              ))}
              </>
             ): (
              <p className="fs-body2 color-orange-20 mb-10x"> No Comments</p>
             )
           }
          </>
        }
      />
    </>
  )

};