/**
 * Hand-off for a scroll target across a client-side route change.
 *
 * When a nav link jumps to a section on *another* page (e.g. "О нас" on
 * /privacy → "/#about-us"), relying on window.location.hash right after
 * router.push is racy — the hash may not be committed when the destination's
 * scroll effect runs. The click handler stashes the target here instead, and
 * the route-sync effect picks it up once the new page has mounted.
 *
 * A module-level variable is enough: modules survive client navigation, and the
 * value is read exactly once on the very next route change.
 */
let pending: string | null = null;

export function setPendingScroll(target: string): void {
  pending = target;
}

export function takePendingScroll(): string | null {
  const target = pending;
  pending = null;
  return target;
}
