import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";
const HomePage = ({ searchParams }: { searchParams: { category?: string, search?: string, city?: string } }) => {
  return <section>
    <CategoriesList category={searchParams.category} search={searchParams.search} city={searchParams.city} />
    <Suspense fallback={<LoadingCards />}>
      <PropertiesContainer category={searchParams.category} search={searchParams.search} city={searchParams.city} />
    </Suspense>
  </section>

};
export default HomePage;
