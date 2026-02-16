import React from 'react';
import { resolveIcon } from '../../utils/iconMap';

const IconRenderer = ({ icon, ...props }) => {
    const IconComponent = resolveIcon(icon);

    if (!IconComponent) return null;

    return <IconComponent {...props} />;
};

export default IconRenderer;
