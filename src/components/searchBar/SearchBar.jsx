import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./searchBar.scss";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const navigate = useNavigate(); 

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    console.log("Search query:", query);
    
    navigate(`/list?type=${query.type}&location=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="location"
          placeholder="City Location"
          value={query.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <button type="submit">
          <img src="/search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
