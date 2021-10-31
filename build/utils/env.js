module.exports = (cdn, env) => {

  let local = {
    desktop: {
      css: `${cdn}/css/desktop`,
      images: `${cdn}/desktop/images`
    },
    global: {
      css: `${cdn}/css`,
      js: `${cdn}/js`
    },
    mobile: {
      css: `${cdn}/css/mobile`,
      images: `${cdn}/mobile/images`
    }
  };

  const pathType = local;

  return Object.assign({
    cdn
  }, pathType);

};
