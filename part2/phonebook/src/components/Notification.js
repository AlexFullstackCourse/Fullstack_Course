const Notification = ({ message /*, messageType*/ }) => {
  if (message === null) {
    return null;
  }

  return <div className="success" /*{messageType}*/>{message}</div>;
};

export default Notification;
