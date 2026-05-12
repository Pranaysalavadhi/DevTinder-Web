import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  const reviewRequest = async (status, _id) => {
    setProcessingIds((prev) => new Set(prev).add(_id));
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(_id);
        return next;
      });
    }
  };

  const getRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/50 text-sm tracking-widest uppercase font-medium">
            Loading requests…
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="alert alert-error max-w-md shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">Something went wrong: {error}</span>
        </div>
      </div>
    );

  if (!requests || requests.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-5 text-center px-4">
          <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-base-content/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-base-content">
              No Pending Requests
            </h2>
            <p className="text-base-content/50 text-sm mt-1 max-w-xs">
              When someone sends you a connection request, it will appear here
              for you to review.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
              Pending
            </p>
            <h1 className="text-3xl font-bold text-base-content">
              Connection Requests
            </h1>
          </div>
          <span className="badge badge-primary badge-outline text-sm px-3 py-3 font-semibold">
            {requests.length} pending
          </span>
        </div>
        <div className="divider mt-4 mb-0 opacity-20"></div>
      </div>

      {/* Request Cards */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          const isProcessing = processingIds.has(request._id);

          return (
            <div
              key={request._id}
              className={`group bg-base-200 border border-base-300 rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 ${
                isProcessing ? "opacity-50 pointer-events-none" : "hover:bg-base-300 hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/40 transition-all duration-300">
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                    src={
                      photoUrl ||
                      `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
                    }
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-semibold text-base-content truncate">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <span className="badge badge-ghost badge-sm text-xs capitalize">
                      {age} · {gender}
                    </span>
                  )}
                </div>
                {about && (
                  <p className="text-sm text-base-content/55 mt-1 line-clamp-2 leading-relaxed">
                    {about}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="shrink-0 flex items-center gap-2">
                {isProcessing ? (
                  <span className="loading loading-spinner loading-sm text-primary"></span>
                ) : (
                  <>
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="btn btn-ghost btn-sm rounded-full px-4 border border-base-content/20 hover:border-error/50 hover:text-error hover:bg-error/10 text-xs font-semibold transition-all duration-200"
                      aria-label="Reject request"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Reject
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="btn btn-primary btn-sm rounded-full px-4 text-xs font-semibold"
                      aria-label="Accept request"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Accept
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;