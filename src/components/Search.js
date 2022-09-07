import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { api } from "../App";
import LoadingSpin from "react-loading-spin";
import "./style.css";
const Search = () => {
  const [folder, setFolder] = useState([]);
  const [folderOne, setFolderOne] = useState([]);
  const [category, setCategory] = useState([]);
  const [icons, setIcons] = useState([]);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const getFolder = async () => {
    try {
      const res = await axios.get(api + "folders");
      const { data } = await res;
      data && setFolder(data.filter((item) => item !== ".DS_Store"));
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async (folder) => {
    try {
      setFolderOne((prev) => folder);
      setIcons([]);
      setCategory([]);
      const res = await axios.get(api + "category?folder=" + folder);
      const { data } = await res;
      data && setCategory(data.filter((i) => i !== ".DS_Store"));
    } catch (error) {
      console.log(error);
    }
  };
  const getIcons = async (folder, category) => {
    try {
      setLoading(true);
      const res = await axios.get(
        api + "icons?folder=" + folder + "&category=" + category
      );
      const { data } = await res;
      data && setIcons(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete icon
  const deleteIcon = async (path) => {
    try {
      const res = await axios.delete(api + "delete?path=" + path);
      if (res.status == 200) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <>
      <div className="search">
        Delete icon
        <div className="searchInput">
          <Form.Select onChange={(e) => getCategory(e.target.value)}>
            <option>Default select</option>
            {folder &&
              folder.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
          </Form.Select>
          <Form.Select onChange={(e) => getIcons(folderOne, e.target.value)}>
            <option>Default select</option>
            {category &&
              category.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
          </Form.Select>
          <div className="icons">
            {icons.length === 0 ? (
              <p>no item</p>
            ) : loading ? (
              <LoadingSpin />
            ) : (
              <>
                {icons.map((item, index) => {
                  return (
                    <div className="icon" key={index}>
                      <img src={api + "static/" + item.path} />
                      <p>{item.name}</p>
                      <Button
                        variant="danger"
                        onClick={() => deleteIcon(item.path)}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {alert && (
        <Alert
          style={{ position: "absolute", right: "15px", top: "15px" }}
          variant="success"
        >
          File is delete
        </Alert>
      )}
    </>
  );
};

export default Search;
