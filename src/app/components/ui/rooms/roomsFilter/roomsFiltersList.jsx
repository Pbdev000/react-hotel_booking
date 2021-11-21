import React from 'react';
import RoomsFilterItem from './roomsFilterItem';

const RoomsFilterList = ({ handleChange, data, children }) => {
  const clonedElements = React.Children.map(children, child => {
    const childType = typeof child.type;
    let config = {};
    if (
      childType === 'object' ||
      (childType === 'function' && child.props.type !== 'submit' && child.props.type !== 'button')
    ) {
      config = {
        ...child.props,
        onChange: handleChange,
        value: data[child.props.name] || '',
      };
    }

    return <RoomsFilterItem title={child.props.title}>{React.cloneElement(child, config)}</RoomsFilterItem>;
  });

  return <form className='filters__form'>{clonedElements}</form>;
};

export default RoomsFilterList;
