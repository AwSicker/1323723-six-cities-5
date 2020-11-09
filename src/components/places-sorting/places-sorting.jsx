import React, {useState} from "react";
import {FilterTypes} from "../../const";
import {ActionCreator} from "../../store/action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {offerProps} from "../../property-types";

const PlacesSortingComponent = ({offers, filter, sortOffers}) => {
  const [opened, setOpened] = useState(false);
  const toggleSortingPopup = () => {
    setOpened(!opened);
  };


  const handleFilterClick = (evt) => {
    const selectedFilter = evt.target.textContent;
    if (filter !== selectedFilter) {
      sortOffers(selectedFilter, offers);
    }
    toggleSortingPopup();
  };

  const optionsClassName = opened ? `places__options--opened` : ``;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={toggleSortingPopup}>
        {filter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${optionsClassName}`}>
        {Object.values(FilterTypes).map((filterType, index)=>{
          return (
            <li key={filterType + index}
              className={`places__option`}
              tabIndex="0"
              onClick={handleFilterClick}
            >
              {filterType}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

PlacesSortingComponent.propTypes = {
  offers: PropTypes.arrayOf(offerProps).isRequired,
  filter: PropTypes.string.isRequired,
  sortOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
  sortOffers(filter, offers) {
    dispatch(ActionCreator.sortOffers(filter, offers));
  }
});

export const PlacesSorting = connect(mapStateToProps, mapDispatchToProps)(PlacesSortingComponent);