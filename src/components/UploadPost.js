import React, { useContext, useState, useEffect, useRef } from 'react';
import { ConfigContext } from  '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AdminWrapper from './AdminWrapper';
import ConditionalWrapper from './ConditionalWrapper';
import Loader from './Loader';
import LongCarousel from './LongCarousel';
import LoadingButton from './LoadingButton';
import Video from './Video';
import Input from './Input';
import Error from './Error';
import Styles from 'styles/UploadPost.css';

export default function UploadPost () {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState('');
  const [doneUploading, setDoneUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [post, setPost] = useState({
    service: '',
    car: '',
    description: '',
    thumbnailIndex: '',
    uploads: null
  });
  const { url, env, token} = useContext(ConfigContext);
  const tempUrl = env === 'production' ? '/assets/tmp/' : url + '/tmp/';
  const videoTypes = ['video/quicktime', 'video/mp4'];
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  useEffect(() => {
    if (post.uploads !== null) {
      if (post.uploads.length === 1) {
        setPost({
          ...post,
          thumbnailIndex: 0
        });
      }
    };
  }, [post.uploads])

  function handleFileChange(e) {
    setError('');
    setResponse('');
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
        if (ratio === '100%') {
          setDoneUploading(true);
          return;
        };
        setProgress(ratio);
      };
    };
    xhr.onreadystatechange = function() {
      if (xhr.status === 400) {
        if (xhr.responseText) {
          const err = JSON.parse(xhr.responseText);
          setLoading(false);
          setError(err.message);
        };
      };
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
    if (loading) return;
    setError('');
    if (post.uploads.length > 1) {
      if (post.service === '' || post.car === '' || post.thumbnailIndex === '') {
        setError('The first three input fields are required, service, car and thumbnail');
        return;       
      };
    } else {
      if (post.service === '' || post.car === '') {
        setError('The first two input fields are required, service and car');
        return;
      };
    };
    setLoading(true);
    fetch(url + '/api/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...post,
        token
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      setPost({
        service: '',
        car: '',
        description: '',
        thumbnailIndex: '',
        uploads: null
      });
      setResponse('Post successfully uploaded go to the our work page to see your upload or you can upload another post.');
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });
  };

  function changeInput(e) {
    setPost({
      ...post,
      [e.target.id]: e.target.value
    });
  };

  function changeThumbnailIndex(e) {
    const num = parseInt(e.target.value)
    if (!isNaN(num)) {
      setPost({
        ...post,
        thumbnailIndex: num
      });
    };
  };

  return (
    <AdminWrapper backButton={'/work'} heading={'Upload Post'}>
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
                      <Video url={tempUrl + item.filename} thumbnailUrl={tempUrl + item.thumbnailName} item={item} index={index} i={i} />
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
                placeholder={'Type of paint protection installed?'} 
                onChange={changeInput}
                value={post.service}
                />
              <Input
                id='car' 
                placeholder={'What car did you install it on?'} 
                onChange={changeInput}
                value={post.car}
                />
              {post.uploads.length > 1 &&
                <div className={Styles.selectContainer}>
                  <select className={Styles.select} value={post.thumbnailIndex} onChange={changeThumbnailIndex}>
                    <option>Select thumbnail based on slides.</option>
                    {post.uploads.map((_, i) => {
                      return <option key={i} value={i}>{++i}</option>
                    })}
                  </select>
                </div>
              }
              <Input
                id='description'
                placeholder={'If you want you can talk more about this project here.'} 
                type={'textarea'} 
                onChange={changeInput}
                value={post.description}
                />
              <LoadingButton title='Create Post' onClick={createPost} loading={loading} />
              {/* <div>{JSON.stringify(post.uploads)}</div> */}
            </div>
          </div>
          :
          <div className={Styles.pictureContainer}>
            {error && <Error error={error} style={{position: 'absolute', top: '10px'}}/>}
            {response && <div className={Styles.response}>{response}</div>}
            {loading ?
              <div className={Styles.loadingContainer}>
                {doneUploading ?
                  <div className={Styles.progress}>Files uploaded successfully, please wait while we compress images and make thumbnails for videos.</div>
                  :
                  <div className={Styles.progress}>Uploading files {progress}</div>
                }
                <Loader width='25px' height='25px' thickness='2px' marginLeft='10px' styles={{marginTop: '20px'}}/>
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