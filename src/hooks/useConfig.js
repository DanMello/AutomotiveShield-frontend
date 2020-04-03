export default function useConfig(hostname) {
  let config = {};
  if (hostname === 'localhost') {
    config = {url: 'http://localhost:3005', device: 'desktop', env: 'development', isMobile: false }
  } else if (/10./.test(hostname)) {
    config = {url: 'http://' + hostname + ':3005', device: 'mobile', env: 'development', isMobile: true }
  } else if (hostname === 'ams.mellocloud.com') {
    config = {url: 'https://ams.mellocloud.com', device: 'desktop', env: 'production', isMobile: false }
  } else if (hostname === 'amsm.mellocloud.com') {
    config = {url: 'https://amsm.mellocloud.com', device: 'mobile', env: 'production', isMobile: true }
  }
  return config;
};