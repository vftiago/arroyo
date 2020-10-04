import React, { Fragment, useEffect, useState } from "react";
import * as THREE from "three";
import Canvas from "./Canvas";
import textureImage from "./img/lightradius.png";

function App() {
    const [texture, setTexture] = useState<THREE.Texture>();

    useEffect(() => {
        const loadTexture = async () => {
            const loader = new THREE.TextureLoader();

            const texture = await loader.load(textureImage);

            setTexture(texture);
        };

        if (!texture) {
            loadTexture();
        }
    }, [texture]);

    return <Fragment>{texture && <Canvas texture={texture} />}</Fragment>;
}

export default App;
