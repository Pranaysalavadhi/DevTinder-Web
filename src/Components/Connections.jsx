import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice';
import { useEffect, useState } from 'react';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getConnections = async () => {
        try {
            setLoading(true);
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data?.data));
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-base-content/50 text-sm tracking-widest uppercase font-medium">
                    Loading connections…
                </p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="alert alert-error max-w-md shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Something went wrong: {error}</span>
            </div>
        </div>
    );

    if (!connections || connections.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="flex flex-col items-center gap-5 text-center px-4">
                <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-5.197-3.744M9 20H4v-2a4 4 0 015.197-3.744M15 11a4 4 0 11-8 0 4 4 0 018 0zm6-3a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-base-content">No Connections Yet</h2>
                    <p className="text-base-content/50 text-sm mt-1 max-w-xs">
                        Start exploring profiles and send connection requests to build your network.
                    </p>
                </div>
                <a href="/explore" className="btn btn-primary btn-sm rounded-full px-6">
                    Explore People
                </a>
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
                            Your Network
                        </p>
                        <h1 className="text-3xl font-bold text-base-content">
                            Connections
                        </h1>
                    </div>
                    <span className="badge badge-primary badge-outline text-sm px-3 py-3 font-semibold">
                        {connections.length} {connections.length === 1 ? 'person' : 'people'}
                    </span>
                </div>
                <div className="divider mt-4 mb-0 opacity-20"></div>
            </div>

            {/* Connection Cards */}
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                {connections.map((connection, index) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div
                            key={_id || index}
                            className="group bg-base-200 hover:bg-base-300 border border-base-300 hover:border-primary/30 rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/40 transition-all duration-300">
                                    <img
                                        alt={`${firstName} ${lastName}`}
                                        className="w-full h-full object-cover"
                                        src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
                                        }}
                                    />
                                </div>
                                {/* Online dot — static for now */}
                                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-success rounded-full ring-2 ring-base-200"></span>
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
                            <div className="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <button
                                    className="btn btn-ghost btn-sm btn-circle tooltip tooltip-left"
                                    data-tip="Message"
                                    aria-label="Message"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                                <button
                                    className="btn btn-primary btn-sm rounded-full px-4 text-xs font-semibold"
                                    aria-label="View Profile"
                                >
                                    Profile
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;