export default function formatDate(timestamp) {
  const date = new Date(timestamp);
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  return `${YYYY}. ${MM}. ${DD}`;
}
