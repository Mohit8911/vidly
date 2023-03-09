import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const  Pagination = (props) => {

    const {itemsCount, pageSize, onPageChange,currPage} = props;
    const pageCount=Math.ceil(itemsCount/pageSize);
    if(pageCount===1) return null;
    const pages= _.range(1,pageCount+1);
    
    return ( 
        <nav>
          <ul className="pagination">
            {pages.map(page =>(
              <li key={page} className={page === currPage ? "page-item active" : "page-item"}>
                <button key={page} className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
     ); 
}

Pagination.propTypes= {
  itemsCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired
};
 
export default Pagination;