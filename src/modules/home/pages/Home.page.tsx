import HomeClock from "@home/components/HomeClock/HomeClock.component";
import useHomePageVM from "./Home.vm";

export default function HomePage() {
  const { t, parentRef } = useHomePageVM();

  return (
    <main
      ref={parentRef}
      className="container mx-auto flex flex-col items-center py-24 duration-300"
    >
      <h1 className="text-3xl font-medium sm:text-4xl">{t("title")}</h1>

      NOTE:
      TODO:
      FIXME:

      (e.g #fff, rgb(100, 0, 0), rgba(255, 0, 0, 0.5), hsl(217deg, 90%, 61%), color(display-p3 1 1 0), oklab(59% 0.1 0.1))

      <HomeClock />
    </main>
  );
}
