import { Tooltip } from "boosted";

export default () => {
  const tooltipList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  tooltipList.map(element => {
    return new Tooltip(element);
  });
};
