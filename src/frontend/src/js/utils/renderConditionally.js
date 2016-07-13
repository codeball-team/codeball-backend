export default function renderConditionally({ when, render }) {
  return when ? render() : undefined;
}
