//@ts-nocheck
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectIsLoading } from "../../../store/states/isLoading";
import { selectPageCount } from "../../../store/states/pageCount";
import Filteredcategory from "./category/Filteredcategory";
import FilteredPrice from "./price/FilteredPrice";


const Aside = () =>{
    

    return (
        <aside>
            <Filteredcategory/>
            <FilteredPrice/>
        </aside>
    );
}

export default Aside;