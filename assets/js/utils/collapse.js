import { Collapse } from "boosted";

export default () => {
  const collapseList = [].slice.call(document.querySelectorAll(".collapse"));
  collapseList.map(element => {
    return new Collapse(element, { toggle: false });
  });
};
