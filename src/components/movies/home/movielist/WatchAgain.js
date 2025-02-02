import Carousel from "better-react-carousel";
import { useEffect, useState } from "react";
import useGet from "../../../../hooks/useGet";
import { Link } from "react-router-dom";

const ContinueWatching = () => {
  const { data, get } = useGet(`movie/popular`);
  // data
  const dataFeedback = data.feedback.results;
  // base image url for img
  const baseImgUrl = data.baseUrl;

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    get();
  }, []);

  if (data.feedback && dataFeedback.length > 0) {
    return (
      <div className="flex flex-col gap-y-3">
        <p className="font-medium text-2xl px-8">Continue Watching</p>
        <Carousel
          scrollSnap={true}
          cols={5}
          rows={1}
          gap={5}
          containerClassName="flex w-full h-auto px-3"
          arrowLeft={
            <div className="absolute flex flex-col items-center px-1 justify-center z-[104] cursor-pointer h-full left-8 rounded-l-sm bg-slate-800 bg-opacity-80">
              <svg
                className="rotate-180"
                width="20"
                height="34"
                viewBox="0 0 20 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.41423 0L0.641113 1.76728L15.8243 17L0.641113 32.2327L2.41423 34L19.3589 17L2.41423 0Z"
                  fill="white"
                />
              </svg>
            </div>
          }
          arrowRight={
            <div className="absolute flex flex-col items-center px-1 justify-center z-[104] cursor-pointer h-full right-8 rounded-r-sm bg-slate-800 bg-opacity-30">
              <svg
                width="20"
                height="34"
                viewBox="0 0 20 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.41423 0L0.641113 1.76728L15.8243 17L0.641113 32.2327L2.41423 34L19.3589 17L2.41423 0Z"
                  fill="white"
                />
              </svg>
            </div>
          }
        >
          {/* loop here */}
          {dataFeedback
            .slice(0, 30)
            .filter((data) => {
              if (data.popularity < 8000) {
                return true;
              }
            })
            .map((data) => (
              <Carousel.Item key={data.id}>
                <Link
                  to={`/dts-movies/home/detail/${data.id}`}
                  onMouseEnter={() => setSelected(data.id)}
                  onMouseLeave={() => setSelected(null)}
                >
                  <div className="relative cursor-pointer">
                    {selected === data.id && (
                      <div
                        className={
                          selected === data.id
                            ? "absolute z-[102] flex w-full h-full bg-black opacity-50"
                            : ""
                        }
                      >
                        <div className="flex w-full h-full justify-center items-center">
                          <p className="inline-flex w-auto justify-center h-auto px-4 py-1 border-2 border-white gap-x-3 items-center">
                            <svg
                              width="20"
                              height="22"
                              viewBox="0 0 20 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0.333328L20 11L0 21.6667V0.333328Z"
                                fill="white"
                              />
                            </svg>
                            <p className="text-xl">Watch</p>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute z-[101] top-0 right-0">
                      {data.popularity > 10000 && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2Z"
                            fill="#B9090B"
                          />
                          <path
                            d="M6.8137 9.392H5.5097V4.95201H3.7417V3.82401H8.5817V4.95201H6.8137V9.392Z"
                            fill="white"
                          />
                          <path
                            d="M11.4166 9.52001C11.0006 9.52001 10.6166 9.44801 10.2646 9.30401C9.918 9.16001 9.61667 8.95735 9.36067 8.69601C9.11 8.43468 8.91267 8.12801 8.76867 7.77601C8.63 7.41868 8.56067 7.02935 8.56067 6.60801C8.56067 6.18668 8.63 5.80001 8.76867 5.44801C8.91267 5.09068 9.11 4.78135 9.36067 4.52001C9.61667 4.25868 9.918 4.05601 10.2646 3.91201C10.6166 3.76801 11.0006 3.69601 11.4166 3.69601C11.838 3.69601 12.222 3.76801 12.5686 3.91201C12.9206 4.05601 13.2246 4.25868 13.4806 4.52001C13.7366 4.78135 13.934 5.09068 14.0726 5.44801C14.2166 5.80001 14.2886 6.18668 14.2886 6.60801C14.2886 7.02935 14.2166 7.41868 14.0726 7.77601C13.934 8.12801 13.7366 8.43468 13.4806 8.69601C13.2246 8.95735 12.9206 9.16001 12.5686 9.30401C12.222 9.44801 11.838 9.52001 11.4166 9.52001ZM11.4166 8.36801C11.7206 8.36801 11.99 8.29601 12.2246 8.15201C12.4593 8.00268 12.6406 7.79468 12.7686 7.52801C12.902 7.26135 12.9686 6.95468 12.9686 6.60801C12.9686 6.25601 12.902 5.94935 12.7686 5.68801C12.6406 5.42135 12.4593 5.21601 12.2246 5.07201C11.99 4.92268 11.7206 4.84801 11.4166 4.84801C11.118 4.84801 10.8513 4.92268 10.6166 5.07201C10.3873 5.21601 10.206 5.42135 10.0726 5.68801C9.94467 5.94935 9.88067 6.25601 9.88067 6.60801C9.88067 6.95468 9.94467 7.26135 10.0726 7.52801C10.206 7.79468 10.3873 8.00268 10.6166 8.15201C10.8513 8.29601 11.118 8.36801 11.4166 8.36801Z"
                            fill="white"
                          />
                          <path
                            d="M14.7609 9.392V3.82401H17.0649C17.5236 3.82401 17.9183 3.90401 18.2489 4.06401C18.5796 4.22401 18.8329 4.44801 19.0089 4.73601C19.1849 5.02401 19.2729 5.36001 19.2729 5.74401C19.2729 6.12801 19.1849 6.46668 19.0089 6.76C18.8329 7.04801 18.5796 7.27201 18.2489 7.43201C17.9183 7.59201 17.5236 7.67201 17.0649 7.67201H16.0649V9.392H14.7609ZM16.0649 6.56801H16.8729C17.2516 6.56801 17.5263 6.49868 17.6969 6.36001C17.8676 6.21601 17.9529 6.01068 17.9529 5.74401C17.9529 5.48268 17.8676 5.28268 17.6969 5.14401C17.5263 5.00001 17.2516 4.92801 16.8729 4.92801H16.0649V6.56801Z"
                            fill="white"
                          />
                          <path
                            d="M7.93716 20.392V12.566L5.61316 13.28V11.642L9.78516 10.466V20.392H7.93716Z"
                            fill="white"
                          />
                          <path
                            d="M14.7174 20.602C13.9334 20.602 13.2474 20.3967 12.6594 19.986C12.0714 19.566 11.6141 18.978 11.2874 18.222C10.9701 17.4567 10.8114 16.556 10.8114 15.52C10.8114 14.484 10.9701 13.588 11.2874 12.832C11.6141 12.0667 12.0714 11.4787 12.6594 11.068C13.2474 10.648 13.9334 10.438 14.7174 10.438C15.5107 10.438 16.1967 10.648 16.7754 11.068C17.3634 11.4787 17.8161 12.0667 18.1334 12.832C18.4601 13.588 18.6234 14.484 18.6234 15.52C18.6234 16.556 18.4601 17.4567 18.1334 18.222C17.8161 18.978 17.3634 19.566 16.7754 19.986C16.1967 20.3967 15.5107 20.602 14.7174 20.602ZM14.7174 18.95C15.3334 18.95 15.8234 18.6467 16.1874 18.04C16.5607 17.4333 16.7474 16.5933 16.7474 15.52C16.7474 14.4467 16.5607 13.6067 16.1874 13C15.8234 12.3933 15.3334 12.09 14.7174 12.09C14.1014 12.09 13.6067 12.3933 13.2334 13C12.8694 13.6067 12.6874 14.4467 12.6874 15.52C12.6874 16.5933 12.8694 17.4333 13.2334 18.04C13.6067 18.6467 14.1014 18.95 14.7174 18.95Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>

                    <img
                      src={`${baseImgUrl}${data.poster_path}`}
                      alt=""
                      className={
                        selected === data.id
                          ? "w-[285px] h-auto scale-95 aspect-2/3 object-cover transition-all duration-100"
                          : "w-[285px] h-auto aspect-2/3 transition-all duration-100"
                      }
                    />
                  </div>
                </Link>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      //   </div>
    );
  } else {
    return <div>Tidak Ada Data</div>;
  }
};
export default ContinueWatching;
