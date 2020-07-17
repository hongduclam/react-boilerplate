import React from 'react';
import PropTypes from 'prop-types';

import Item from 'old/components_del/ListItem/Item';
import Wrapper from 'old/components_del/ListItem/Wrapper';

function ListItem(props) {
  return (
    <Wrapper>
      <Item>{props.item}</Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
