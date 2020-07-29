import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('./');
  };
  return (
    <button
      className={styles.iconButton}
      onClick={handleClick}
    >
      <svg width="108" height="27" viewBox="0 0 108 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.538 4.4L16.416 17H13.284L10.512 8.468L7.65 17H4.536L0.396 4.4H3.42L6.264 13.256L9.234 4.4H11.934L14.814 13.328L17.748 4.4H20.538ZM30.4632 12.194C30.4632 12.23 30.4452 12.482 30.4092 12.95H23.0832C23.2152 13.55 23.5272 14.024 24.0192 14.372C24.5112 14.72 25.1232 14.894 25.8552 14.894C26.3592 14.894 26.8032 14.822 27.1872 14.678C27.5832 14.522 27.9492 14.282 28.2852 13.958L29.7792 15.578C28.8672 16.622 27.5352 17.144 25.7832 17.144C24.6912 17.144 23.7252 16.934 22.8852 16.514C22.0452 16.082 21.3972 15.488 20.9412 14.732C20.4852 13.976 20.2572 13.118 20.2572 12.158C20.2572 11.21 20.4792 10.358 20.9232 9.602C21.3792 8.834 21.9972 8.24 22.7772 7.82C23.5692 7.388 24.4512 7.172 25.4232 7.172C26.3712 7.172 27.2292 7.376 27.9972 7.784C28.7652 8.192 29.3652 8.78 29.7972 9.548C30.2412 10.304 30.4632 11.186 30.4632 12.194ZM25.4412 9.296C24.8052 9.296 24.2712 9.476 23.8392 9.836C23.4072 10.196 23.1432 10.688 23.0472 11.312H27.8172C27.7212 10.7 27.4572 10.214 27.0252 9.854C26.5932 9.482 26.0652 9.296 25.4412 9.296ZM33.1831 6.776H29.1511V4.4H40.1311V6.776H36.0991V17H33.1831V6.776ZM44.6459 7.172C46.1459 7.172 47.2979 7.532 48.1019 8.252C48.9059 8.96 49.3079 10.034 49.3079 11.474V17H46.6799V15.794C46.1519 16.694 45.1679 17.144 43.7279 17.144C42.9839 17.144 42.3359 17.018 41.7839 16.766C41.2439 16.514 40.8299 16.166 40.5419 15.722C40.2539 15.278 40.1099 14.774 40.1099 14.21C40.1099 13.31 40.4459 12.602 41.1179 12.086C41.8019 11.57 42.8519 11.312 44.2679 11.312H46.4999C46.4999 10.7 46.3139 10.232 45.9419 9.908C45.5699 9.572 45.0119 9.404 44.2679 9.404C43.7519 9.404 43.2419 9.488 42.7379 9.656C42.2459 9.812 41.8259 10.028 41.4779 10.304L40.4699 8.342C40.9979 7.97 41.6279 7.682 42.3599 7.478C43.1039 7.274 43.8659 7.172 44.6459 7.172ZM44.4299 15.254C44.9099 15.254 45.3359 15.146 45.7079 14.93C46.0799 14.702 46.3439 14.372 46.4999 13.94V12.95H44.5739C43.4219 12.95 42.8459 13.328 42.8459 14.084C42.8459 14.444 42.9839 14.732 43.2599 14.948C43.5479 15.152 43.9379 15.254 44.4299 15.254ZM51.5793 3.644H54.3873V17H51.5793V3.644ZM60.8813 13.202L59.5313 14.534V17H56.7233V3.644H59.5313V11.204L63.6353 7.316H66.9833L62.9513 11.42L67.3433 17H63.9413L60.8813 13.202Z" fill="#44717A" />
        <path fillRule="evenodd" clipRule="evenodd" d="M47.227 21.9991C47.227 23.571 48.4975 24.6834 49.9948 24.6834C50.8078 24.7023 51.5879 24.3572 52.1291 23.7393C52.1341 23.7331 52.1421 23.7303 52.1499 23.7319C52.1576 23.7336 52.1638 23.7395 52.1659 23.7473C52.2664 24.0827 52.4128 24.402 52.6006 24.6959C52.6077 24.7045 52.6077 24.717 52.6006 24.7255C51.8846 25.3833 50.9548 25.748 49.9904 25.7492C47.9097 25.7492 46.2146 24.1022 46.2146 21.965C46.2146 19.8562 47.9667 18.2501 50.0004 18.2501C51.8273 18.2361 53.3959 19.5696 53.7079 21.4019C53.7109 21.4188 53.7064 21.4361 53.6956 21.4493C53.6849 21.4625 53.6689 21.4701 53.6521 21.4702H52.7581C52.7322 21.4702 52.7098 21.4517 52.7045 21.4258C52.4374 20.1678 51.2731 19.2579 49.9859 19.2579C48.4796 19.2579 47.227 20.4465 47.227 21.9991ZM90.3079 24.5255C91.0246 25.2348 92.0009 25.6288 93.0154 25.6182C95.0663 25.6182 96.8334 24.0239 96.8334 21.9619C96.8334 19.8721 95.125 18.25 93.0259 18.25C90.9929 18.25 89.2079 19.7965 89.2079 21.8497C89.1946 22.8514 89.5913 23.8161 90.3079 24.5255ZM90.2234 21.9763C90.2234 20.3965 91.44 19.2855 93.0154 19.2855C94.525 19.2855 95.8067 20.3676 95.8067 21.9108C95.8067 23.4295 94.5442 24.5916 93.0246 24.5916C91.5434 24.5916 90.2234 23.4851 90.2234 21.9763ZM87.6013 25.4868L86.1259 22.5606C87.1534 22.318 87.7625 21.6266 87.7613 20.5696C87.7613 19.2422 86.8196 18.5132 85.525 18.5132H81.3192V25.4868H82.3567V22.5983H85.0025L86.4304 25.4868H87.6013ZM82.3567 19.5225H85.5259C86.2017 19.5225 86.735 19.7796 86.735 20.5131C86.735 21.2466 86.2296 21.579 85.5259 21.579H82.3567V19.5225ZM73.2989 18.5132V25.4868H79.2154V24.4675H74.3181V22.3734H77.2937V21.364H74.3181V19.5414H79.0382V18.5132H73.2989ZM69.7491 18.5132V25.4868H70.8009V18.5132H69.7491ZM64.8322 21.6909L66.9929 25.4868H68.1713L65.5517 20.9341L67.8565 18.5132H66.4441L63.0019 22.1595V18.5132H61.9919V25.4868H63.0019V23.6265L64.8322 21.6909ZM40.1667 18.5132V25.4858L40.1678 25.4868H45.4258V24.4677H41.1851V18.5132H40.1667ZM53.9057 19.2623C54.6196 18.6115 55.5471 18.251 56.5091 18.2502C57.5081 18.2408 58.4692 18.6353 59.1781 19.3456C59.8871 20.0558 60.2848 21.0228 60.2827 22.0309C60.2827 24.1157 58.5352 25.7497 56.5069 25.7497C54.661 25.7722 53.0782 24.425 52.789 22.5853C52.7868 22.569 52.7916 22.5524 52.8023 22.54C52.8129 22.5275 52.8284 22.5202 52.8448 22.52H53.7363C53.7626 22.5201 53.785 22.539 53.7898 22.565C54.0395 23.8189 55.213 24.6612 56.5114 24.6612C58.0136 24.6612 59.2629 23.486 59.2629 21.951C59.2629 20.3969 57.9958 19.2982 56.5024 19.2982C55.6921 19.281 54.9149 19.6229 54.376 20.2339C54.371 20.24 54.363 20.2429 54.3553 20.2412C54.3475 20.2395 54.3414 20.2337 54.3393 20.226C54.2389 19.8955 54.093 19.5809 53.9057 19.2915C53.8986 19.2831 53.8986 19.2707 53.9057 19.2623Z" fill="#0F0F0F" />
      </svg>
    </button>
  );
};

export default Logo;