import React, {useEffect, useContext, useState} from 'react';
import { ConfigContext } from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingButton from './LoadingButton';
import ConditionalWrapper from './ConditionalWrapper';
import AdminWrapper from './AdminWrapper';
import queryString from 'query-string';
import Loader from './Loader';
import LongCarousel from './LongCarousel';
import Video from './Video';
import Input from './Input';
import Error from './Error';
import Styles from 'styles/UploadPost.css';

export default function PostManger ({history, heading}) {
  const [index, setIndex] = useState(0);
  const [post, setPost] = useState({
    service: '',
    car: '',
    description: '',
    thumbnailIndex: '',
    uploads: null
  });
  const [progress, setProgress] = useState('');
  const [doneUploading, setDoneUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUploads, setLoadingUploads] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [response, setResponse] = useState('');
  const { url, env, token} = useContext(ConfigContext);
  const tempUrl = env === 'production' ? '/assets/tmp/' : url + '/tmp/';
  const videoTypes = ['video/quicktime', 'video/mp4'];
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const values = queryString.parse(location.search);
  const userDataUrl = env === 'production' ? '/assets' : url;
  let postId = values.postId;

  useEffect(() => {
    if (postId) {
      fetch(url + `/api/getPost?postId=${postId}`).then(response => response.json()).then(response => {
        if (response.error) {
          console.log(response.message)
          setError(response.message);
          return;
        };
        setPost(response.post);
      }).catch(err => {
        console.log(err)
      })
    };
    fetch(url + '/api/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json()).then(response => {
      if (response.error) {
        removeToken(response.message, true);
      };
      setUser(response.user);
    }).catch(err => {
      setError(err.message + ' Please refresh.');
    });
  }, []);

  useEffect(() => {
    if (post.uploads !== null) {
      if (post.uploads.length === 1) {
        setPost({
          ...post,
          thumbnailIndex: 0
        });
      }
    };
  }, [post.uploads]);

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

    setLoadingUploads(true);

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
          setLoadingUploads(false);
          setError(err.message);
        };
      };
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const newUploads = JSON.parse(xhr.responseText); 
        setLoadingUploads(false);
        console.log(post.uploads)
        console.log(newUploads)
        setPost({
          ...post,
          uploads: post.uploads === null ? [...newUploads] : [...post.uploads, ...newUploads]
        });
      };
    };
    xhr.open('POST', url + '/api/uploadwork', true);
    xhr.send(data);
  };

  function createPost(e) {
    if (loading || loadingUploads) return;
    setError('');
    if (post.uploads.length > 1) {
      if (post.service === '' || post.car === '' || post.thumbnailIndex === '') {
        setError('The first three input fields are required, service, thumbnail, and car.');
        return;       
      };
    } else {
      if (post.service === '' || post.car === '') {
        setError('The first two input fields are required, service and car.');
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
        token,
        postId
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      history.push(`/postresponse?message=${response.message}&link=/work&heading=our work`);
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

  function changeService(e) {
    setPost({
      ...post,
      service: e.target.value
    });
  };

  function deleteFile(item, i) {
    setPost({
      ...post,
      uploads: post.uploads.filter(i => i.filename !== item.filename)
    })
    setIndex(i - 1 === -1 ? 0 : i - 1 );
  };

  function deletePost() {
    if (loading || loadingUploads) return;
    fetch(url + '/api/deletepost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        postId
      })
    }).then(response => {
      return response.json()
    }).then(response => {
      if (response.error) {
        setError(response.message)
        return;
      };
      history.push(`/postresponse?message=${response.message}&link=/work&heading=our work`);
    }).catch(err => {
      setError(err.message);
    });
  };

  console.log('latest', post)

  return (
    <AdminWrapper 
      backButton={'/work'} 
      heading={heading} 
      method={postId ? deletePost : null} 
      methodLabel={postId ? 'Delete Post' : null}
      color={postId ? 'orangered' : null}
      fontColor={postId ? 'white' : null}
      >
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
                                    i={index}
                                    returnIndex={setIndex}
                                    >
                                    {children}
                                  </LongCarousel>}
              >
              {post.uploads.map((item, i) => {
                return (
                  <div key={i} className={Styles.pictureContainer}>
                    {post.uploads.length > 1 && 
                      <div className={Styles.trashIconContainer} onClick={() => deleteFile(item, i)}>
                        <FontAwesomeIcon icon={faTrash} className={Styles.trashIcon}/>
                      </div>
                    }
                    {(videoTypes.includes(item.mimetype)) ?
                      <Video 
                        url={item.saved ? userDataUrl + item.publicFilePath : tempUrl + item.filename } 
                        thumbnailUrl={item.saved ? userDataUrl + item.publicThumbnailPath : tempUrl + item.thumbnailName} 
                        item={item} 
                        index={index} 
                        i={i} 
                        />
                      :
                      <div 
                        className={Styles.picture}
                        style={{backgroundImage: item.saved ? `url(${userDataUrl}${item.publicFilePath})` : `url(${tempUrl}${item.filename})`}}
                      />
                    }
                  </div>
                );
              })}
            </ConditionalWrapper>
            <div className={Styles.headingContainerTop}>
              {!loadingUploads ?
                <div className={Styles.buttonContainerUpload}>
                  <input type="file" name="file" id="file" className={Styles.fileInput} onChange={handleFileChange} multiple/>
                  <label htmlFor='file' className={Styles.heading}>
                    Upload more pictures or videos
                    <FontAwesomeIcon icon={faPlusCircle} className={Styles.icon}/>
                  </label>
                </div>
                :
                <div className={Styles.loadingContainerTop}>
                  <div className={Styles.loadingHeading}>{!doneUploading ? 'Uploading more files ' + progress : 'Compressing files please wait'} </div>
                  <Loader width='25px' height='25px' thickness='2px' marginLeft='10px'/>
                </div>
               }
            </div>
            <div className={Styles.bottomContainer}>
              <div className={Styles.descriptionHeading}>Tell your clients a little about this project.</div>
              {error && <Error error={error} style={{marginTop: '10px'}} />}
              {/* <Input
                id='service'
                placeholder={'Type of paint protection installed?'} 
                onChange={changeInput}
                value={post.service}
                /> */}
              {user.services && user.services.length > 0 &&
                <div className={Styles.selectContainer}>
                  <select className={Styles.select} value={post.service} onChange={changeService}>
                    <option value="">Type of paint protection.</option>
                    {user.services.map((service, i) => {
                      return <option key={i} value={service}>{service}</option>
                    })}
                  </select>
                </div>
              }
              {post.uploads.length > 1 &&
                <div className={Styles.selectContainer}>
                  {/* <div className={Styles.thumbnailHeading}>Select thumbnail based on slides.</div> */}
                  <select className={Styles.select} value={post.thumbnailIndex} onChange={changeThumbnailIndex}>
                    <option>Select thumbnail based on slides.</option>
                    {post.uploads.map((_, i) => {
                      return <option key={i} value={i}>{++i}</option>
                    })}
                  </select>
                </div>
              }
              <Input
                id='car'
                placeholder={'What car did you install it on?'} 
                onChange={changeInput}
                value={post.car}
                />
              <Input
                id='description'
                placeholder={'If you want you can talk more about this project here.'} 
                type={'textarea'} 
                onChange={changeInput}
                value={post.description}
                />
              <LoadingButton title={postId ? 'Update Post' : 'Create Post'} onClick={createPost} loading={loading} />
            </div>
          </div>
          :
          <div>
            {!postId ?
              <div className={Styles.pictureContainer}>
                {error && <Error error={error} style={{position: 'absolute', top: '10px'}}/>}
                {response && <div className={Styles.response}>{response}</div>}
                {loadingUploads ?
                  <div className={Styles.loadingContainer}>
                    {doneUploading ?
                      <div className={Styles.progress}>Files uploaded successfully, please wait while we compress files.</div>
                      :
                      <div className={Styles.progress}>Uploading files {progress}</div>
                    }
                    <Loader width='25px' height='25px' thickness='2px' marginLeft='10px' styles={{marginTop: '20px'}}/>
                  </div>
                :
                  <div className={Styles.buttonContainerUpload}>
                    <input type="file" name="file" id="file" className={Styles.fileInput} onChange={handleFileChange} multiple/>
                    <label htmlFor='file' className={Styles.heading}>
                      Upload pictures or videos
                      <FontAwesomeIcon icon={faPlusCircle} className={Styles.icon}/>
                    </label>
                  </div>
                }
              </div>
              :
              <div className={Styles.pictureContainer}>
                {error && <Error error={error} style={{position: 'absolute', top: '10px'}}/>}
                {response && <div className={Styles.response}>{response}</div>}
              </div>
            }
          </div>
        }
    </AdminWrapper>
  );
};