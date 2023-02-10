import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import "./News.css"
const EditNews = () => {
  const [news, setNews] = useState("");
  const [text, setText] = useState("");

  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNewsById();
  }, []);

  const getNewsById = async () => {
    const response = await axios.get(`http://localhost:5000/news/${id}`);
    setNews(response.data.news);
    setText(response.data.text);

    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateNews = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("news", news);
    formData.append("text", text);

    try {
      await axios.patch(`http://localhost:5000/news/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/adminNews");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-1">
      <div className="box">
        <div className="columns">
<div className="box">
          <div className="column is-full">

            <form onSubmit={updateNews}>
              <div className="field">
                <label className="label">Rubrik</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={news}
                    onChange={(e) => setNews(e.target.value)}
                    placeholder="Rubrik"
                  />
                </div>
              </div>

              <label className="label">Nyhet</label>
              <div className="control">
                <textarea
                  rows="10"
                  type="text"
                  cols="115"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder=""
                  className="textarea is-info"
                />
              </div>

            
                <div className="field">
                  <label className="label">Bild</label>
                  <div className="control">
                    <div className="file">
                      <label className="file-label">
                        <input
                          type="file"
                          className="file-input"
                          onChange={loadImage}
                        />
                        <span className="file-cta">
                          <span className="file-label">
                            <span class="file-icon">
                              <FaUpload />
                            </span>Välj en ny bild</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {preview ? (
                  <figure>
                    <img className="image" src={preview} alt="Förhansgranska" />
                  </figure>
                ) : (
                  ""
                )}
             
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Uppdater din nyhet
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
</div>


  );
};

export default EditNews;