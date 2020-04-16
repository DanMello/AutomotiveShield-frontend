import React, { useContext, useState, useEffect, useRef } from 'react';
import { ConfigContext } from  '../routes';
import Loader from './Loader';
import ConditionalWrapper from './ConditionalWrapper';
import Styles from 'styles/UploadPost.css';
import useWindowResize from '../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AdminWrapper from './AdminWrapper';
import LongCarousel from './LongCarousel';
import LoadingButton from './LoadingButton';
import Video from './Video';
import Input from './Input';
import Error from './Error';

export default function UploadPost () {

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState({
    service: '',
    car: '',
    description: '',
    uploads: null
  });
  const screenSize = useWindowResize();
  const { url, env } = useContext(ConfigContext);
  const tempUrl = env === 'production' ? '/assets/tmp/' : url + '/';
  const videoTypes = ['video/quicktime', 'video/mp4'];
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  function handleFileChange(e) {
    setError('');
    const data = new FormData();
    const files = e.target.files;
    const acceptedTypes = videoTypes.concat(imageTypes);

    for(var x = 0; x < files.length; x++) {
      if (acceptedTypes.every(type => files[x].type !== type)) {
        setError('You tried to upload an invalid file type. Valid file types are images and videos')
        return;
      };
      data.append('file', files[x]);
    };

    let xhr = new XMLHttpRequest();

    setLoading(true);

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        const ratio = Math.floor((e.loaded / e.total) * 100) + '%';
        setProgress(ratio);
      };
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        setLoading(false);
        setPost({
          ...post,
          uploads: JSON.parse(xhr.responseText)
        });
      };
    };
    xhr.open('POST', url + '/api/uploadwork', true);
    xhr.send(data);
  };

  function createPost(e) {
    if (post.service === '' || post.car === '') {
      setError('The first two input fields are required, service and car!');
      return;
    };

  };

  function changeInput(e) {
    setPost({
      ...post,
      [e.target.id]: e.target.value
    });
  };

  return (
    <AdminWrapper backButton={'/work'} heading={'Upload Posts'}>
        {post.uploads ? 
          <div className={Styles.container}>
            <div className={Styles.backgroundContainer}/>
            <div className={Styles.number}>{index + 1} / {post.uploads.length}</div>
            <ConditionalWrapper
              condition={post.uploads.length > 1}
              wrapper={children => <LongCarousel 
                                    activeColor={'#ff9f00'} 
                                    normalColor={'#444'} 
                                    dots={true} 
                                    noRow={true}
                                    returnIndex={setIndex}
                                    >
                                    {children}
                                  </LongCarousel>}
              >
              {post.uploads.map((item, i) => {
                return (
                  <div key={i} className={Styles.pictureContainer}>
                    {(videoTypes.includes(item.mimetype)) ?
                      <Video tempUrl={tempUrl} item={item} index={index} i={i} />
                      :
                      <div 
                        className={Styles.picture} 
                        style={{backgroundImage: `url(${tempUrl}${item.filename})`}}
                      />
                    }
                  </div>
                );
              })}
            </ConditionalWrapper>
            <div className={Styles.bottomContainer}>
              <div className={Styles.descriptionHeading}>Tell your clients a little about this project.</div>
              {error && <Error error={error} style={{marginTop: '10px'}} />}
              <Input
                id='service'
                placeholder={'Type of paint protection installed'} 
                onChange={changeInput} 
                />
              <Input
                id='car' 
                placeholder={'What car did you install it on.'} 
                onChange={changeInput}
                />
              <Input 
                id='description'
                placeholder={'If you want you can talk more about this project here.'} 
                type={'textarea'} 
                onChange={changeInput}
                />
              <LoadingButton title='Create Post' onClick={createPost} loading={loading} />
            </div>

          </div>
          :
          <div className={Styles.pictureContainer}>
            {error && <Error error={error} style={{marginTop: '10px'}}/>}
            {loading ?
              <div className={Styles.loadingContainer}>
                <div className={Styles.progress}>Uploading files {progress}</div>
                <Loader width='25px' height='25px' thickness='2px' marginLeft='10px'/>
              </div>
            :
              <div className={Styles.headingContainer}>
                <input type="file" name="file" id="file" className={Styles.fileInput} onChange={handleFileChange} multiple/>
                <label htmlFor='file' className={Styles.heading}>
                  Upload pictures or videos
                  <FontAwesomeIcon icon={faPlusCircle} className={Styles.icon}/>
                </label>
              </div>
            }
        </div>
        }
    </AdminWrapper>
  );
};