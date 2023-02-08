import React from "react";

function Logo({ size = 16 }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 136 192"
			width={size}
			height={size}
		>
			<g className="cls-1" data-name="Rectangle 2">
				<path
					d="M60 0H28v171.43C28 182.79 38.74 192 52 192h8V0z"
					className="cls-2"
					data-name="Rectangle 2"
					transform="translate(-28)"
				></path>
			</g>
			<g className="cls-1" data-name="Rectangle 2">
				<g data-name="Rectangle 2">
					<path d="M128 0H136V24H128z" className="cls-2"></path>
					<path
						d="M136 0L128 0 128 24 136 24 136 0 136 0z"
						className="cls-2"
					></path>
				</g>
			</g>
			<g className="cls-1" data-name="Rectangle 2">
				<path
					d="M156 0h-8c-13.26 0-24 9.21-24 20.57V192h8c13.26 0 24-9.21 24-20.57V0z"
					className="cls-2"
					data-name="Rectangle 2"
					transform="translate(-28)"
				></path>
			</g>
		</svg>
	);
}

export default Logo;
