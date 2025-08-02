import LoadingCards from "@/components/card/LoadingCards"
import CategoriesList from "@/components/home/CategoriesList"

function loading() {
    return (
        <section>
            <CategoriesList />
            <LoadingCards />
        </section>
    )
}
export default loading