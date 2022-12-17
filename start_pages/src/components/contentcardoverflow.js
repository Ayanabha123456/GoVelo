import React from 'react';

const ContentCard = (props) => {
    // const sectionstyle = {
    //     textAlign: 'center',
    //     position: 'absolute',
    //     left: '50%',
    //     top: '50%',
    //     transform: 'translate(-50%,-50%)',
    //     boxShadow:'1px 1px 3px 3px rgb(76,154,42)',
    //     width: 'auto',
    //     minHeight: '100px',
    //     maxHeight: '500px',
    //     overflow: 'auto'
    //   }
    const sectionstyle = {
        textAlign:'center',
        boxShadow:'1px 1px 3px 3px rgb(76,154,42)',
        width:'50%',
        margin:'auto',
    }
      return (
        <div className='startsection' style={sectionstyle}>
            {props.content}
        </div>
        )
}

export default ContentCard;