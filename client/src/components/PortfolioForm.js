import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioForm = ({ refreshPortfolio, item }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    clientSiteLink: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        clientSiteLink: item.clientSiteLink,
        image: null,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: null,
        clientSiteLink: '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('clientSiteLink', formData.clientSiteLink);

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (item) {
        await axios.put(`http://localhost:5000/portfolio/${item.id}`, formDataToSend);
      } else {
        await axios.post('http://localhost:5000/portfolio', formDataToSend);
      }

      refreshPortfolio();
    } catch (error) {
      console.error("Error saving portfolio item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Client Site Link</label>
        <input
          type="text"
          className="form-control"
          name="clientSiteLink"
          value={formData.clientSiteLink}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Upload Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Update Project
      </button>
    </form>
  );
};

export default PortfolioForm;
