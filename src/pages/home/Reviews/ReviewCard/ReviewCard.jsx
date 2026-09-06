import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { review: reviewTitle, userName, ratings, user_photoURL } = review;
  return (
    <div className="flex items-center justify-cente p-6">
      <div className="w-full max-w-lg">
        <div className="card bg-white shadow-md rounded-2xl p-6 ">
          <div className=" text-teal-200 opacity-70">
            <FaQuoteLeft size={48} />
          </div>

          <div className="mt-6">
            <p className="text-gray-700 text-base leading-relaxed">
              {reviewTitle}
            </p>

            <div className="my-6">
              <div className="border-t border-dashed border-gray-200" />
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`avatar w-12 h-12 rounded-full flex items-center justify-center text-white `}
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <img src={user_photoURL} alt="" />
                </span>
              </div>

              <div>
                <div className="text-gray-800 font-semibold text-sm">
                  {userName}
                </div>
                <div className="text-gray-400 text-sm">{ratings}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
