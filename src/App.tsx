/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useState } from "react";
import * as THREE from "three";
import Canvas from "./Canvas";
import textureImage from "./img/lightradius.png";

function App() {
    const [texture, setTexture] = useState<THREE.Texture>();

    useEffect(() => {
        const loadTexture = async () => {
            const loader = new THREE.TextureLoader();

            const texture = await loader.load(textureImage);
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;

            setTexture(texture);
            Canvas(texture, canvas);
        };

        if (!texture) {
            loadTexture();
        }
    }, [texture]);

    return (
        <Fragment>
            <canvas css={canvasStyle} id="canvas"></canvas>
            <div css={contentStyle}>
                <h1 id="title">reclaim your digital space</h1>
            </div>
        </Fragment>
    );
}

const canvasStyle = css`
    z-index: -1;
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow-x: hidden;
    top: 0;
    left: 0;
`;

const contentStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: flex-end;
    width: 100%;
    height: 200vh;
`;

export default App;
