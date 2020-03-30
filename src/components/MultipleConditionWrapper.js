export default function MultipleConditionWrapper ({ condition, wrapper, otherWrapper, children }) {
  return condition ? wrapper(children) : otherWrapper(children);
};