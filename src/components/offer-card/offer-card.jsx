import React, {useState} from "react";
import {connect} from "react-redux";
import cn from "classnames";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offerProps} from "../../property-types.js";
import {favoritesHotels} from "../../store/api-actions";


export const OfferCardComponent = ({onOfferCardHover, offer, onOfferCardLeave, articleClass, imgClass, isFavoriteScreen, setBookmarkStatus}) => {
  const [status, setStatus] = useState(offer.is_favorite);

  const bookmarkHandler = () => {
    setStatus(Number(!status));
    setBookmarkStatus(offer.id, Number(!status));
  };

  const bookmarkClass = cn(`place-card__bookmark-button button `, {
    'place-card__bookmark-button--active': status
  });

  return (
    <article
      key={`${offer.id}-${offer.title}`}
      className={`${articleClass} place-card`}
      onMouseEnter={() =>{
        if (onOfferCardHover) {
          onOfferCardHover(offer.id);
        }
      }}
      onMouseLeave={() => {
        if (onOfferCardLeave) {
          onOfferCardLeave();
        }
      }}>
      {offer.is_premium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <div className={`${imgClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/` + offer.id}>
          <img className="place-card__image" src={offer.preview_image} width="260" height="200" alt="Place image"/>
        </Link >
      </div>
      <div className={`${isFavoriteScreen || ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClass} type="button" onClick={bookmarkHandler}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/` + offer.id}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
};

OfferCardComponent.propTypes = {
  onOfferCardHover: PropTypes.func,
  onOfferCardLeave: PropTypes.func,
  articleClass: PropTypes.string,
  isFavoriteScreen: PropTypes.bool,
  imgClass: PropTypes.string,
  offer: offerProps.isRequired,
  setBookmarkStatus: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => ({
  setBookmarkStatus(id, status) {
    dispatch(favoritesHotels(id, status));
  },
});

export const OfferCard = connect(null, mapDispatchToProps)(OfferCardComponent);
