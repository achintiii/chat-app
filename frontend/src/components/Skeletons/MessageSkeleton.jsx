import React from 'react';

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null); // Adjust the number of skeletons here

    return (
        <>
            {skeletonMessages.map((_, index) => (
                <div
                    key={index}
                    className={`flex gap-3 items-center ${
                        index % 2 === 0 ? '' : 'justify-end'
                    }`}
                >
                    {index % 2 === 0 ? ( // Left-aligned skeleton
                        <>
                            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                            <div className="flex flex-col gap-1">
                                <div className="skeleton h-4 w-40"></div>
                                <div className="skeleton h-4 w-40"></div>
                            </div>
                        </>
                    ) : ( // Right-aligned skeleton
                        <>
                            <div className="flex flex-col gap-1">
                                <div className="skeleton h-4 w-40"></div>
                            </div>
                            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default MessageSkeleton;
