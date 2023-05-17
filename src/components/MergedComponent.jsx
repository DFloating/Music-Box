import React from 'react';
import ComponentA from './MusicList';
import ComponentB from './MusicShowAll';

class MergedComponent extends React.Component {
  render() {
    return (
      <div>
        <ComponentA />
        <ComponentB />
      </div>
    );
  }
}

export default MergedComponent;