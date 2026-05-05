import React from 'react';
import { motion } from 'framer-motion';
import { FiVolumeX, FiVolume2 } from 'react-icons/fi';
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import '../styles/Notification.css';

const Notification = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <MdCheckCircle />,
    error: <MdErrorOutline />,
    info: <FiVolume2 />,
    warning: <FiVolumeX />
  };

  return (
    <motion.div
      className={`notification notification-${type}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="notification-content">
        {icons[type]}
        <span>{message}</span>
      </div>
    </motion.div>
  );
};

export default Notification;
