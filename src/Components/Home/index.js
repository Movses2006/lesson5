import { useState, useEffect } from "react";

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setCocktails(data.drinks || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const inputSearch = () => {
    fetchData();
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by cocktail name"
        value={searchTerm}
        onChange={handleChange}
      /> 
      <button className="inputSearch" onClick={inputSearch}>Search</button>
      <div className="cocktail-list">
        {cocktails.map(({ idDrink, strDrink, strCategory, strDrinkThumb }) => (
          <div className="cocktail" key={idDrink}>
            <img src={strDrinkThumb} alt={strDrink} />
            <div>
              <h4>{strDrink}</h4>
              <h5>{strCategory}</h5>
            </div>
            <button className="btn">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
