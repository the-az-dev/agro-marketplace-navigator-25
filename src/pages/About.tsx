import Navbar from "@/components/Navbar";
import JSONCategories from "../../assets/mocks/categories.json";
import { Category } from "@/types/Category";
import { Footer } from "react-day-picker";

function About(){

    const categories = JSONCategories as Category[];

    return(
        <>
            <Navbar categories={categories}/>
            <div>
                <h1>About</h1>
            </div>
            <Footer />
        </>
    );

}

export default About;