/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Typed from "typed.js";
import { colors } from "../theme";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";

let typedMissionStatement: Typed;

function Footer() {
	const handleMissionStatementVisibilityChange = () => {
		if (typedMissionStatement) return;

		typedMissionStatement = new Typed("#mission-statement", {
			strings: [`take back control of your digital <span>space.</span>`],
			typeSpeed: 10,
			showCursor: false,
		});
	};

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView) {
			handleMissionStatementVisibilityChange();
		}
	}, [inView]);

	return (
		<Element name="footer">
			<div ref={ref} css={footerStyle}>
				<div>
					<p id="mission-statement"></p>
				</div>
			</div>
		</Element>
	);
}

const footerStyle = css`
	height: 200px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	div {
		width: 241px;
	}
	span {
		color: ${colors.text.accent};
	}
`;

export default Footer;
