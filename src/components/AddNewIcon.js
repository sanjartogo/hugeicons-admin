import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { api } from "../App";
import "./styleAdd.css";
const AddNewIcon = () => {
  const [folder, setFolder] = useState([]);
  const [folderOne, setFolderOne] = useState([]);
  const [category, setCategory] = useState([]);
  const [path, setPath] = useState("");
  const [alert, setAlert] = useState(false);
  const [file, setFile] = useState(null);
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
      console.log(folder, category);
      setPath(folder + "/" + category);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadSvg = async () => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      console.log(path);
      const res = await axios.post(api + "upload?path=" + path, formData);
      console.log(res);
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
      <div className="addNew">
        Upload icon
        <div className="addNewIcon">
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
          <div style={{ display: "flex" }}>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button onClick={uploadSvg}>Upload</Button>
          </div>
        </div>
      </div>
      {alert && (
        <Alert
          style={{ position: "absolute", right: "15px", top: "15px" }}
          variant="success"
        >
          File upload
        </Alert>
      )}
    </>
  );
};

export default AddNewIcon;
