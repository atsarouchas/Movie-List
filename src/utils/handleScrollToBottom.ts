export function isScrollAtBottom() {
  return (
    window.scrollY > 0 &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  );
}
