import React from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

import http from '../utils/http';
import { URL } from '../constants/URL';
import { ListItem, Loading } from '../components';
export class ListWrapper extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: true,
      list: [],
      data: {}
    }

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 60,
    })


  }



  async componentDidMount() {
    const type = this.props.location.pathname.slice(1);
    const routeURL = type ? URL[type] : 'topstories';
    let list = await http.get(`/${routeURL}.json`);
    this.setState({
      list,
      loading: false
    })
  }

  componentDidUpdate = async (prevProps, prevState) => {

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        list: [],
        loading: true
      })
      const type = this.props.location.pathname.slice(1);
      const routeURL = type ? URL[type] : 'topstories';
      const list = await http.get(`/${routeURL}.json`);
      this.setState({
        list,
        loading: false
      })
    }
  }

  updateData = (data) => {
    const { id } = data;
    this.setState({
      data: {
        ...this.state.data,
        [id]: data,
      }
    })

  }


  render() {
    const cache = this.cache;

    return (
      <div>
        <div className="container mt-5x">
          {this.state.loading && (
            <Loading />
          )}
          <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  source={this.state.list}
                  width={width}
                  height={height}
                  rowHeight={this.cache.rowHeight}
                  deferredMeasurementCache={cache}
                  rowCount={this.state.list.length}
                  rowRenderer={({ key, index, parent, style }) => {
                    const id = this.state.list[index];
                    const data = this.state.data[id] ? this.state.data[id] : null;
                    return (
                      <CellMeasurer
                        key={key}
                        cache={cache}
                        parent={parent}
                        rowIndex={index}
                      >
                        <ListItem style={style} key={key} id={id} data={data} updateData={this.updateData} />
                      </CellMeasurer>

                    )
                  }}
                />
              )}
            </AutoSizer>
          </div>


          {/* <ul>
          {this.state.list.slice(0,20).map((id, index) => <ListItem index={index} key={id} id={id} />)}
        </ul> */}
        </div>
      </div>
    );
  }



}

