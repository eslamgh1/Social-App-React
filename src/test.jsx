
<div className="w-1/2 mx-auto bg-gray-400 flex flex-col gap-3">
    {/*  Post Design */}
    <div className="bg-emerald-600 rounded-lg p-5">
        <div className="post-header bg-blue-500 flex justify-between">

            <div className="left-part bg-red-500">
                {/* <img src="" alt="" /> */}
                <h5>User name</h5>
                <p>Date</p>
            </div>

            <div className="right-part bg-red-200">
                <p>Icone</p>
            </div>

        </div>

        <div className="post-content">

            <p>Post Content</p>
            {/* Conditional Rendering */}
            {/* <img src="" alt="" /> */}
            <div className="post-footer bg-amber-400 flex justify-around">
                <div>
                    <p>Like Icon</p>
                    <h5>Like </h5>
                </div>
                <div>
                    <p>Comment Icon</p>
                    <h5>Comment </h5>
                </div>
                <div>
                    <p>Share Icon</p>
                    <h5>Share </h5>
                </div>
            </div>
        </div>

    </div>
</div>