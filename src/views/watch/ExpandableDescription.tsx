import { useState } from 'react';

import { DescriptionText, DescriptionToggle } from './watchView.styles';

import type { ExpandableDescriptionProps } from './types';

const ExpandableDescription = ({ description }: ExpandableDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (): void => {
    setIsExpanded((currentValue) => !currentValue);
  };

  return (
    <>
      <DescriptionText $isExpanded={isExpanded}>{description}</DescriptionText>

      <DescriptionToggle type="button" onClick={handleToggle}>
        {isExpanded ? 'Show less' : 'Show more'}
      </DescriptionToggle>
    </>
  );
};

export default ExpandableDescription;
