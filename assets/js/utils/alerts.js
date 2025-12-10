import { Alert } from "boosted";

export default () => {
  const alertList = [].slice.call(document.querySelectorAll(".alert"));
  alertList.map(function (element) {
    return new Alert(element);
  });
};
