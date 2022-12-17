import React from 'react';

const ContentCard = (props) => {
  const sectionstyle = {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    boxShadow: '1px 1px 3px 3px rgb(76,154,42)',
    width: 'auto',
    padding: '1%',
  }
  return (
    <div className='startsection' style={sectionstyle}>
      {props.content}
    </div>
  )
}

export default ContentCard;
