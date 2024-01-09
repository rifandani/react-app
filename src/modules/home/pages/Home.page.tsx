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

      <HomeClock />
    </main>
  );
}
