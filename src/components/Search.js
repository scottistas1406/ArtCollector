import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  const { setIsLoading, setSearchResults } = props;

  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * */
   const [centuryList, setCenturyList] = useState([]);
   
   /** classificationList, setClassificationList (default should be an empty array, [])
   */
   const [classificationList, setClassificationList] = useState([]);
   /**
   * queryString, setQueryString (default should be an empty string, '')
    */
   const [queryString, setQueryString] = useState('');
   /**
   century, setCentury (default should be the string 'any')*/
  const [century, setCentury] = useState('any');

  /* classification, setClassification (default should be the string 'any')
   */
  const [classification, setClassification] = useState('any');

  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()])
      .then(([allCenturies, allClassifications]) => {
        setCenturyList(allCenturies);
        setClassificationList(allClassifications);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const results = await fetchQueryResults({century, classification, queryString});
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="search" onSubmit={handleFormSubmit}>
      <fieldset>
        <label htmlFor="keywords">Query</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
      </fieldset>
     
       
      
    
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(e) => setClassification(e.target.value)} >
        <option value= "any">Any</option>
          {/* map over the classificationList, return an <option /> */}
          {classificationList.map((classificationItem) => (
            <option key={classificationItem.name} value={classificationItem.name}>
              {classificationItem.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          value={century}
          onChange={(e) => setCentury(e.target.value)}>
          <option value="any">Any</option>
          {/* map over the centuryList, return an <option /> */}
          {centuryList.map((centuryItem) => (
            <option key={centuryItem.name} value={centuryItem.name}>
              {centuryItem.name}
            </option>
          ))}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;