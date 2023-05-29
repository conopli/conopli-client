const modalProps = (type = '') => {
  let title = '',
    subTitle = '',
    buttonText = '',
    handler = () => {};

  let props = {};

  if (type === 'confirm') props = { title, subTitle, buttonText, handler };
  else if (type === 'alert') props = { title, subTitle };

  return {
    isOpen: true,
    type,
    props,
  };
};

export default modalProps;
