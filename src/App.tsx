/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useState } from "react";
import * as THREE from "three";
import Canvas from "./Canvas";
import logoImage from "./img/lightradius-slightly-less-thicc.png";
import letteringImage from "./img/lettering.png";

function App() {
    const [textures, setTextures] = useState<THREE.Texture[]>();

    useEffect(() => {
        const loadTexture = async () => {
            const loader = new THREE.TextureLoader();

            let textures = [];

            const logoTexture = await loader.load(logoImage);
            const letteringTexture = await loader.load(letteringImage);

            textures.push(logoTexture, letteringTexture);

            const canvas = document.getElementById("canvas") as HTMLCanvasElement;

            setTextures(textures);

            console.log(textures);
            Canvas(textures, canvas);
        };

        if (!textures) {
            loadTexture();
        }
    }, [textures]);

    return (
        <Fragment>
            <canvas css={canvasStyle} id="canvas"></canvas>
            <main css={contentStyle}></main>
            <div css={callToActionStyle}>
                <h1>reclaim your digital space</h1>
            </div>
            <div css={missionStatementStyle}>
                <p>take control of your digital life</p>
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
    align-items: center;
    justify-content: center;
    width: 100vw;
`;

const missionStatementStyle = css`
    height: 2000px;
    top: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const callToActionStyle = css`
    display: flex;
    justify-content: center;
    height: 200px;
    width: 100%;
    position: absolute;
    bottom: 0;
    h1 {
        font-size: 24px;
    }
`;

export default App;
