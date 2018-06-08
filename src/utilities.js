export const getRedirectURL = ({ kind, avatar }) => {
  let url = kind === "boss" ? "/boss" : "/genius";

  if (!avatar) {
    url += "Info";
  }

  return url;
};

export const getChatId = (from, to) => {
  return [from, to].sort().join("_");
};

export const wrapOnce = fn => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      console.log(`finished`);

      return fn();
    }
  };
};
