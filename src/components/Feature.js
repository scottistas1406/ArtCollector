import React from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;

  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
      setSearchResults(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="content">
      <a href="#" onClick={handleClick}>{searchValue}</a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult } = props;

  if (!featuredResult) {
    return <main id="feature"></main>;
  }

  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline
  } = featuredResult ||{};

  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          <span className="title">Culture</span>
          <span className="content">{culture}</span>
          <span className="title">Technique</span>
          <span className="content">{technique}</span>
          <span className="title">Medium</span>
          <span className="content">{medium && medium.toLowerCase()}</span>
          {people && people.length > 0 && (
            <React.Fragment>
              <span className="title">People</span>
              {people.map(person => (
                <span className="content" key={person.displayname}>
                  {person.displayname}
                </span>
              ))}
            </React.Fragment>
          )}
        </section>
        
        <section className="photos">
          <img src={primaryimageurl} alt={title} />
        </section>
      </div>
    </main>
  );
};

export default Feature;
