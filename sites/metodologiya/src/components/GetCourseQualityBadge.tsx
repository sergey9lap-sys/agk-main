"use client";

import { usePathname } from "next/navigation";

const badgeMarkup = `
<div class="gc-qualityreestr-school show">
  <style>
    .gc-qualityreestr-school {
      position: fixed !important;
      right: -292px !important;
      top: 177px !important;
      transition: 0.5s ease-in-out !important;
      z-index: 30 !important;
    }
    .show.gc-qualityreestr-school {
      right: -195px !important;
    }
    .gc-qualityreestr-school:hover {
      right: 0 !important;
    }

    @media screen and (max-width: 768px) {
      .gc-qualityreestr-school-qr {
        width: 221px !important;
        height: auto !important;
      }
      .gc-qualityreestr-school {
        right: -221px !important;
        top: 112px !important;
      }
      .show.gc-qualityreestr-school {
        right: -148px !important;
      }
      .gc-qualityreestr-school:hover {
        right: -148px !important;
      }
    }
    .gc-qualityreestr-school a {
      display: flex !important;
    }

    @media print {
      .gc-qualityreestr-school {
        display: none !important;
      }
    }
  </style>
  <a href="https://getcourse.ru/qualityreestr~1c383cd30b7c298ab50293adfecb7b18" target="_blank" rel="noopener">
    <svg xmlns="http://www.w3.org/2000/svg" class="gc-qualityreestr-school-qr" fill="none" width="292" height="95">
      <image width="100%" href="https://getcourse.ru/public/img/true_version.svg"></image>
      <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" x="222" y="15" viewBox="0 0 37 37" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h37v37H0z"></path><path stroke="#000000" d="M0 0.5h7m3 0h1m4 0h1m2 0h1m1 0h1m3 0h1m3 0h1m1 0h7M0 1.5h1m5 0h1m5 0h1m1 0h6m1 0h2m1 0h2m1 0h2m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h1m6 0h1m2 0h4m2 0h1m1 0h2m2 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h2m1 0h1m1 0h2m1 0h7m1 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h1m4 0h1m5 0h2m2 0h1m4 0h1m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h5m2 0h2m1 0h1m3 0h1m3 0h2m2 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h1m4 0h1m1 0h2m3 0h1m3 0h1M0 8.5h1m1 0h5m2 0h3m1 0h1m4 0h1m1 0h3m2 0h3m2 0h5M3 9.5h1m4 0h2m3 0h5m5 0h2m3 0h1m2 0h1m1 0h1m1 0h1M1 10.5h1m3 0h2m1 0h1m1 0h1m2 0h2m2 0h1m2 0h2m4 0h6m1 0h4M3 11.5h2m3 0h3m1 0h3m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1m2 0h1m3 0h1m2 0h1M0 12.5h2m4 0h1m1 0h1m1 0h1m1 0h3m2 0h2m1 0h1m1 0h1m1 0h2m1 0h4m1 0h1m1 0h3M3 13.5h1m3 0h3m3 0h1m2 0h2m1 0h5m4 0h1m2 0h1M0 14.5h1m1 0h3m1 0h1m3 0h2m1 0h5m2 0h2m3 0h4m1 0h4m1 0h2M0 15.5h2m2 0h1m4 0h3m1 0h2m2 0h3m1 0h2m4 0h2m2 0h2m3 0h1M0 16.5h1m1 0h1m3 0h2m4 0h2m1 0h2m4 0h1m3 0h4m1 0h1m1 0h1m1 0h1m1 0h1M0 17.5h2m1 0h1m1 0h1m2 0h3m1 0h4m2 0h1m1 0h6m3 0h1m1 0h1m3 0h1M0 18.5h1m1 0h2m1 0h4m5 0h3m1 0h2m1 0h2m1 0h7m3 0h3M5 19.5h1m2 0h3m1 0h2m1 0h1m3 0h3m1 0h2m2 0h1m1 0h2m1 0h1m3 0h1M2 20.5h1m1 0h3m2 0h1m1 0h5m1 0h1m1 0h2m1 0h1m2 0h2m1 0h3m1 0h3M0 21.5h1m4 0h1m1 0h2m2 0h1m1 0h1m2 0h1m1 0h3m1 0h2m2 0h1m1 0h2m3 0h1m1 0h1M0 22.5h1m1 0h2m1 0h3m1 0h2m2 0h4m1 0h1m1 0h1m1 0h1m3 0h8m2 0h1M0 23.5h1m1 0h1m1 0h1m2 0h3m2 0h1m1 0h1m5 0h1m3 0h1m1 0h1m1 0h5m2 0h1M0 24.5h3m1 0h1m1 0h1m5 0h1m1 0h2m2 0h1m1 0h3m1 0h3m1 0h1m1 0h3m1 0h1m1 0h1M0 25.5h1m2 0h2m3 0h1m2 0h1m3 0h2m6 0h1m5 0h1m3 0h1M0 26.5h1m3 0h1m1 0h1m1 0h2m2 0h1m4 0h2m1 0h2m3 0h1m1 0h1m1 0h3m2 0h3M0 27.5h1m1 0h1m4 0h1m3 0h4m1 0h1m4 0h3m6 0h1m1 0h2m1 0h1M0 28.5h1m1 0h1m3 0h1m1 0h2m1 0h1m4 0h3m3 0h1m2 0h8m1 0h1m1 0h1M8 29.5h6m3 0h1m1 0h5m2 0h3m3 0h2m1 0h1M0 30.5h7m2 0h2m1 0h4m1 0h1m2 0h2m3 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h1M0 31.5h1m5 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h2m1 0h4m2 0h1m1 0h1m3 0h2m2 0h1M0 32.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m1 0h1m4 0h1m1 0h1m1 0h8m1 0h3M0 33.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h2m2 0h1m1 0h5m3 0h3m1 0h2m2 0h1M0 34.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h6m4 0h1m1 0h2m5 0h4M0 35.5h1m5 0h1m2 0h2m2 0h3m3 0h3m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m2 0h1M0 36.5h7m1 0h1m5 0h6m2 0h1m1 0h2m1 0h1m2 0h1m1 0h1m1 0h3"></path></svg>
    </svg>
  </a>
</div>
`;

export function GetCourseQualityBadge() {
  const pathname = usePathname();

  if (pathname === "/metodologiya/challenge") {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: badgeMarkup }} />;
}
