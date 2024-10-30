import './styles.css';

const PortfolioItem = ({ item, onDelete, onEdit, onToggleVisibility }) => {
  return (
    <div className="card mb-3">
      <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.title} className="card-img-top" />
      <div className="card-body d-flex flex-column ">
        <h5 className='title'>Title: {item.title}</h5>
        <p className="card-text">Description: {item.description}</p>
        <div className="d-flex justify-content-between w-100">
          {item.clientSiteLink && (
            <a href={item.clientSiteLink} className="btn btn-primary mb-2 flex-fill me-1 group-buttons">
              Visit Client Site
            </a>
          )}
          <button className="btn btn-warning flex-fill me-1 group-buttons" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger flex-fill me-1 group-buttons" onClick={onDelete}>
            Delete
          </button>
          <button className={`btn flex-fill group-buttons ${item.isVisible ? 'btn-secondary' : 'btn-success'}`} onClick={() => onToggleVisibility(item.id)}>
            {item.isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
