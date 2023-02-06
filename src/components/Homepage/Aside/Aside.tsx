//@ts-nocheck
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectIsLoading } from "../../../store/states/isLoading";
import { selectPageCount } from "../../../store/states/pageCount";
import CategoriesFilter from "./category/CategoriesFilter";
import FilteredPrice from "./price/FilteredPrice";


const Aside = () =>{
    
    return (
        <aside>
            <CategoriesFilter/>
            <FilteredPrice/>
        </aside>
    );
}

export default Aside;