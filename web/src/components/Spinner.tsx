import { Icon } from '@iconify/react';
import React from 'react';

export const Spinner: React.FC = React.memo(() => {
  return <Icon className="animate-spin mr-3 inline" icon="mdi:loading" />;
});
Spinner.displayName = 'Spinner';
