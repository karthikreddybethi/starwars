import { useEffect, useState } from "react";

function useObserverHook(charectersData, ref) {
  const [inView, setInView] = useState(false);

  const observerFunc = (entry) => {
    if (entry[0].isIntersecting) {
      setInView(true);
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerFunc, {
      threshold: 1,
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [charectersData, ref]);

  return [inView, observerFunc];
}

export default useObserverHook;
