'use client'
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const GoogleAdPcItem = () => {


  // useEffect(() => {
  //   const loadAd = () => {
  //     if (typeof window !== "undefined" && window.adsbygoogle) {
  //       window.adsbygoogle = window.adsbygoogle || [];
  //       window.adsbygoogle.push({});
  //       adsLoaded.current = true;
  //     }
  //   };

  //   if (!adsLoaded.current) {
  //     setTimeout(loadAd, 0);
  //   }
  // }, []);

  return (
    <div
      className="googleAd-container flex items-center justify-center border rounded-md"
      style={{ maxWidth: '282px', maxHeight: '282px' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3489691346477126"
        data-ad-slot="6791365281"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAdPcItem;
