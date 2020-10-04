import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import http from "../utils/http";
import { mapTime } from '../utils/mapTime';


export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {}
    }
  }

  componentDidMount = async () => {
    const data = await http.get(`/item/${this.props.id}.json`);
    this.setState({ data, loading: false });
  }

  render(){
    return(
      <div className="comment">
        {this.state.loading &&
        <>
         <SkeletonTheme color="lightGray">
            <Skeleton height={50} style={{ width: '100%' }} className="mb-4x" />
          </SkeletonTheme>
        </>
          }

        {this.state.data.id && this.state.data.by && (
          <div className="comment__content">
            <div className="d-flex align-items-center mb-5x">
              <h5>{this.state.data.by}</h5>
              <span className="fs-small ml-3x color-grey-60">{mapTime(this.state.data.time)} ago</span>
            </div>
            <div
              className="comment__details"
              dangerouslySetInnerHTML={{ __html: this.state.data.text }}
            />
          </div>
        )}
        {this.state.data.kids &&
          this.state.data.kids.length > 0 && (
            <div className="comment__sub-comments">
              {this.state.data.kids.map((id, key) => (
                <Comment id={id} key={key} />
              ))}
            </div>
          )}
      </div>
    );
  }
}