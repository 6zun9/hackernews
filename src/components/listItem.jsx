import React from 'react'
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import http from '../utils/http';
import { mapTime } from '../utils/mapTime';
import { UiCommentAltLines } from 'vyaguta-icons/ui';

export class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount = async () => {
    if (this.props.data === null) {
      const data = await http.get(`/item/${this.props.id}.json`);
      this.props.updateData(data);
      this.setState({
        loading: false,
      })
    }

  }

  render() {
    const { id, title, time, by, descendants } = this.props.data || {};

    return (
      <>
        {
          this.state.loading &&
          <SkeletonTheme color="lightGray">
            <Skeleton height={50} style={{ width: '100%' }} className="mb-4x" />
          </SkeletonTheme>

        }
        {
          id && (

            <div className="list__item" style={this.props.style}>
              {/* <div className="list__index mr-4x">
                {index + 1}
              </div> */}
              <div className="list__item-details">
                <div className="list__title mb-1x">
                  <Link to={{
                    state: { data: this.props.data },
                    pathname: `/story/${id}`
                  }}
                    className="text-semibold fs-body2 color-orange-20" >
                    {title}
                  </Link>
                </div>
                <div className="list__info">
                  <span className="text-italic">{mapTime(time)}</span>
                  <span className="line"></span>
                  <span className="text-italic">by <span className="color-orange-20">{by}</span> </span>
                  {(descendants && descendants > 0) ? (
                    <span className="ml-4x d-flex align-items-center">
                      <UiCommentAltLines className="mr-1x" /> {descendants} comments
                    </span>
                  ) : ''}
                </div>
              </div>
            </div>
          )
        }

      </>


    )
  }
}