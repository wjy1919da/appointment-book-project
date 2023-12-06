import { useEffect } from "react";
import { useLocation } from "react-router-dom";

let before = ''
const isPostPage = (pathname) => {
  return pathname.indexOf('posts') >= 0
}
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const current = isPostPage(pathname)
    if (current && before) return
    window.scrollTo(0, 0);
    before = current
  }, [pathname]);

  return null;
}