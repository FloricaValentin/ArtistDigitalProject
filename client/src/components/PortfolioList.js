import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioItem from "./PortfolioItem";
import PortfolioForm from "./PortfolioForm";
import "./styles.css";

const PortfolioList = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchPortfolioItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/portfolio");
      setPortfolioItems(response.data);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const refreshPortfolio = () => {
    fetchPortfolioItems();
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const openModal = (item = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/portfolio/${id}`);
      refreshPortfolio();
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await axios.put(`http://localhost:5000/portfolio/${id}/toggle-visibility`);
      refreshPortfolio();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const showAllHiddenProjects = async () => {
    try {
      await axios.put("http://localhost:5000/portfolio/show-hidden");
      refreshPortfolio();
    } catch (error) {
      console.error("Error making hidden projects visible:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="title">Digital Portfolio</h1>
      <div className="text-end mb-3">
        <button className="btn btn-success me-2" onClick={() => openModal()}>
          Add Project
        </button>
        <button className="btn btn-secondary" onClick={showAllHiddenProjects}>
          Show All Hidden Projects
        </button>
      </div>
      <div className="row">
        {portfolioItems
          .filter(item => item.isVisible)
          .map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <PortfolioItem
                item={item}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => openModal(item)}
                onToggleVisibility={() => handleToggleVisibility(item.id)}
              />
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">
                  {selectedItem ? "Edit Project" : "Add Project"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <PortfolioForm
                  refreshPortfolio={refreshPortfolio}
                  item={selectedItem}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
