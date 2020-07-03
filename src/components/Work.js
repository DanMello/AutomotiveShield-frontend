import React, {useEffect, useContext, useState, useRef} from 'react';
import { ConfigContext } from '../routes';
import ImageBanner from './ImageBanner';
import {Link} from 'react-router-dom';
import Styles from 'styles/Work.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronUp, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import LoadingButton from './LoadingButton';
import PostContainer from './PostContainer';
import CarouselCounter from './CarouselCounter';
import queryString from 'query-string';

function Uploads({array, token}) {
  const [activeCarousels, setActiveCarousels] = useState([]);
  return array.map((item, i) => {
    const date = new Date(item.date);
    let day = date.getDate().toString();
    let month = date.toLocaleString('default', { month: 'short' });
    let year = date.getFullYear().toString();
    return (
      <div key={i} className={Styles.uploadContainer}>
        <PostContainer 
          item={item}
          i={i} 
          activeCarousels={activeCarousels}
          setActiveCarousels={setActiveCarousels}
          />
        <div className={Styles.paddingContainer}>
          {token && 
            <Link to={`/editPost?postId=${item._id}`} className={Styles.editPost}>
              <div>Edit Post</div> 
              <FontAwesomeIcon icon={faEdit} className={Styles.editIcon} />
            </Link>
          }
          <div className={Styles.heading}>{item.service}</div>
          <div className={Styles.carHeading}>{item.car}</div>
          <div className={Styles.description}>{item.description}</div>
          <div className={Styles.date}>{month + ', ' + day + ' ' + year} </div>
        </div>
      </div>
    )
  });
};

export default function Work () {

  const [uploads, setUploads] = useState([]);
  const [search, setSearch] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(ConfigContext);
  const limit = 3;

  useEffect(() => {
    const values = queryString.parse(location.search);
    let query = values.search;
    if (query) {
      setSearch(query);
    };
    fetch(url + `/api/cars?limit=${limit}`).then(response => response.json())
    .then(response => {
      console.log(response)
      setCount(response.count);
      setUploads(response.cars);
    }).catch(err => {
      console.log(err)
    });
    // return () => {
    //   window.history.pushState(null, null, window.location.pathname);
    // };
  }, []);

  useEffect(() => {
    if (search !== null) {
      const values = queryString.parse(location.search);
      if (values.search) {
        window.history.pushState(null, null, window.location.pathname);
      };
      fetch(url + `/api/searchwork?search=${search}`)
      .then(response => response.json())
      .then(response => {
        setCount(response.count);
        setUploads(response.cars);
      }).catch(err => {
        console.log(err)
      });
    };
  }, [search]);

  function scrollToTop() {
    window.scrollTo(0,0);
  };

  function loadMore() {
    setLoading(true);
    fetch(url + `/api/cars?skip=${uploads.length}&limit=${limit}`).then(response => response.json())
    .then(response => {
      setLoading(false);
      setUploads(prevState => [...prevState, ...response.cars]);
    }).catch(err => {
      console.log(err)
    });
  };

  function searchData(e) {
    setSearch(e.target.value);
  };

  return (
    <div>
      <ImageBanner 
        url={"/assets/smallslide1-min.JPEG"} 
        heading={"Our Work"}
        paragraph={"When it comes to paint protection, we've seen it all and done it all."}
        bottomStatement={"See some of our work below"}
        />
        <div className={Styles.container}>
            <div className={Styles.inputContainer}>
              <div className={Styles.inputSubContainer}>
                <input 
                  className={Styles.input} 
                  placeholder='Search our work...' 
                  value={search === null ? '' : search} 
                  onChange={searchData}
                  />
                <div className={Styles.iconContainer}>
                  <FontAwesomeIcon icon={faSearch} className={Styles.icon}/>
                </div>
              </div>
            </div>

          <div className={Styles.borderContainer}>
            {token && 
              <div className={Styles.uploadPostContainer}>
                <Link to='/uploadpost' className={Styles.uploadLink}>
                  <div className={Styles.uploadHeading}>Upload Post</div>
                  <FontAwesomeIcon className={Styles.uploadIcon} icon={faPlusCircle} />
                </Link>
              </div>
            }
            {uploads.length > 0 ?
              <Uploads array={uploads} token={token} />
              :
            <div className={Styles.noUploadsFound}>{search ? 'We could not find any posts that match: ' + '"' + search + '"' : 'No uploads available please check back later.'}</div>
            }
            {uploads.length > 0 &&
              <div className={Styles.buttonContainer}>
                {count > uploads.length ? 
                  <LoadingButton loading={loading} marginLeft={10} className={Styles.loadMoreButton} onClick={loadMore} title={'Load more posts'}></LoadingButton>
                  :
                  <div className={Styles.allPosts}>That's all the posts we got!</div>
                }
                <div className={Styles.scrollUpContainer} onClick={scrollToTop}>
                  <div className={Styles.scrollUpButton}>Scroll to top</div>
                  <FontAwesomeIcon icon={faChevronUp} className={Styles.upIcon}/>
                </div>
              </div>
            }
          </div>
        </div>
    </div>
  );
};