import React from 'react';

interface IProps {
  heading: React.ReactNode;
  children?: React.ReactNode;
}

const KPageLayout: React.FC<IProps> = ({children, ...props}) => {
  return (
    <div>
      <div
        style={{
          fontSize: 'xx-large',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
        }}
      >
        {props.heading}
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default KPageLayout;