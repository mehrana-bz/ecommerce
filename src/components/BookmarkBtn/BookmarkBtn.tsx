import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Product } from "../../store/states/products";
import { selectBookmarks, toggleBookmark } from "../../store/states/bookmarks";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

interface BookmarkBtnProps {
  productId: Product["id"];
}

const BookmarkBtn = ({ productId }: BookmarkBtnProps) => {
  const dispatch = useAppDispatch();
  
  const bookmarksState = useAppSelector(selectBookmarks);

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(productId));
  };

  return (
    <Button variant="outline-danger" onClick={handleToggleBookmark}>
      <FontAwesomeIcon
        icon={bookmarksState.includes(productId) ? faSolidHeart : faHeart}
      />
    </Button>
  );
};
export default BookmarkBtn;
