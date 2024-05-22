// Import libraries
import React, { useState, useContext } from "react";

function Main({ children }: {children: any}): JSX.Element
{
    return (
        <main className="bg-colorpalette-backgrounds-primary text-colorpalette-texts-default h-screen">
            {children}
        </main>
    );
}

export default Main;