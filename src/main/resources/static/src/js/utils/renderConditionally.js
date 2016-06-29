export default function renderConditionally({ when, what }) {
  return when ? what : undefined;
}
