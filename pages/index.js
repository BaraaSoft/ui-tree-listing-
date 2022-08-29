import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { fetchData } from "./api/data";

export default function Home() {
  const [datalist, setDatalist] = useState([]);

  const getData = async () => {
    const response = await fetchData();
    setDatalist(response);
    return response;
  };

  const travse = (root, margin = 0) => {
    if (!root.children) {
      return <p> &#9679; {root.name}</p>;
    }

    return root.children.map((item) => {
      if (item.children)
        return (
          <>
            <h1 style={{ marginLeft: margin }}>&#9660;{item?.name}</h1>
            {travse(item, margin + 30)}
          </>
        );
      else if (!item.children)
        return <p style={{ marginLeft: margin }}> &#9679;{item?.name}</p>;
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.cdontainer}>
      <main className={styles.main}>{travse({ children: datalist })}</main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
