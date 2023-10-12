import Snowfall from "react-snowfall";

import React from "react";

const Snow = () => {
    return (
        <div className="absolute w-full min-h-[100svh] z-10">
            <Snowfall color="#F7EDF0" snowflakeCount={400} />
        </div>
    );
};

export default Snow;
