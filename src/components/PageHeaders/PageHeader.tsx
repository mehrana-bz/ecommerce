import {ReactNode} from "react";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
    children : ReactNode
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return <h2 className={styles.color}>{children}</h2>;
};

export default PageHeader;
