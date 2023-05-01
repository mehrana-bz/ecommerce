import {ReactNode} from "react";
import styles from "./PageHeader.module.scss";
import classNames from "classnames";

interface PageHeaderProps {
    children : ReactNode;
    className?: string;
}

const PageHeader = ({ children, className }: PageHeaderProps) => {
  return <h2 className={classNames(styles.color, className)}>{children}</h2>;
};

export default PageHeader;
