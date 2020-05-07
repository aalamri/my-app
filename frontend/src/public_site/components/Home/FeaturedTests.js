import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FEATURED_TESTS_QUERY } from "./queries";

const tagSVG =
    <svg viewBox="0 0 167.09 168.85" class="yellow-tag">
        <path class="cls-2" d="M83.55,168.84h0C82.6,169.78,0,131.43,0,85.29V0H167.09V85.29C167.09,131.43,84.56,168.84,83.55,168.84Z" />
    </svg>


const icon3 = <svg class="position-absolute pb-0 ti-credit-card icon-sm icon-color test-icon" x="0px" y="0px"
    viewBox="0 0 266.1 384.2" style={{ enableBackground: "new 0 0 266.1 384.2", height: "8rem" }}>
    <path d="M125.3,368.6c-3.1,0-5.7-2.6-5.6-5.7l0.4-25.2c-3.7,0.4-7.7,0.4-11.3,0.1l-0.4,24.8c0,3.1-2.6,5.6-5.6,5.6c0,0-0.1,0-0.1,0
	c-3.1,0-5.6-2.6-5.6-5.7l0.4-27.1c-7.6-2.5-14.6-6.9-20.4-12.6l-0.2-0.3c-10-10-15.5-23.2-15.5-37.2v-3.7l-22.3,0l-18.7,16
	c-2.4,2-6,1.7-8-0.6c-1-1.2-1.5-2.7-1.3-4.2c0.1-1.5,0.8-2.9,2-3.8l20.2-17.3c1-0.9,2.3-1.4,3.7-1.4l24.5,0V245H32.7
	c-3.3,0-6-2.5-6-5.7s2.7-5.7,6-5.7h28.8v-25.1c0-0.6,0-1.2,0-1.9l-22,0c-1.4,0-2.8-0.5-3.9-1.3L13.3,188c-1.3-1-2.1-2.4-2.2-4
	c-0.1-1.5,0.4-3,1.5-4.2c2.2-2.3,5.9-2.6,8.4-0.6l20.8,16.1l21.2,0c2.5-11.9,8.4-22.7,17.2-31.4c8.8-8.8,19.9-14.8,32-17.3v-0.7
	l0.1,0V108L71.6,86.9c-1.8-1-2.8-2.8-2.8-4.8l0-45.5c0-2.1,1.2-3.9,3-4.9l39.5-22.6c1.7-1,3.8-1,5.5,0l39.8,22.7
	c1.7,1,2.8,2.8,2.8,4.7l0,45.5c0,2.1-1.2,4-3.1,4.9l-40.2,21v38.6c12.1,2.5,23.1,8.4,32,17.3c8.7,8.7,14.6,19.5,17.2,31.4l18.9,0
	l21.9-16.1c2.6-1.9,6.3-1.6,8.6,0.6c1.2,1.2,1.7,2.7,1.6,4.2c-0.1,1.6-0.9,3-2.3,4l-23.7,17.4c-1.1,0.8-2.5,1.3-4,1.3l-19.8,0
	c0,0.6,0,1.2,0,1.9v25.1h29.1c3.4,0,6.2,2.5,6.2,5.7s-2.8,5.7-6.2,5.7h-29.1v25.2l19.2,0c1.4,0,2.7,0.5,3.7,1.4l20.3,17.3
	c2.3,2,2.6,5.6,0.6,8c-1,1.1-2.3,1.8-3.8,2c-1.5,0.1-3-0.4-4.1-1.3l-18.7-16l-16.8,0v3.7c0,14-5.5,27.3-15.5,37.3
	c-5.7,5.7-12.6,10-20,12.6c0,0,0,0.1,0,0.1L131,363C131,366.1,128.4,368.6,125.3,368.6z M124.1,333l-0.4,29.9c0,0.9,0.7,1.7,1.6,1.7
	c0.9,0,1.7-0.7,1.7-1.6v0l0.4-27.7c0-0.3-0.1-0.5-0.1-0.7l-0.9-2l2.1-0.7c7.5-2.3,14.4-6.5,20.1-12.1c9.2-9.3,14.3-21.5,14.3-34.5
	v-3.5H65.3v3.5c0,13,5.1,25.2,14.3,34.4l0.2,0.2c5.7,5.6,12.7,9.8,20.2,12l1.8,0.5l-0.4,1.8c0,0.1,0,0.2,0,0.3l-0.4,27.8
	c0,0.9,0.7,1.7,1.6,1.7c0,0,0,0,0,0c0.9,0,1.6-0.7,1.6-1.6l0.4-29.3l2.3,0.4c4.7,0.7,10,0.7,14.7-0.1L124.1,333z M185.2,277.5
	l19.8,17c0.3,0.3,0.8,0.4,1.2,0.4c0.4,0,0.8-0.2,1.1-0.6c0.6-0.7,0.5-1.7-0.2-2.3l-20.3-17.3c-0.3-0.3-0.7-0.4-1.1-0.4l-23.2,0V241
	h33.1c1.2,0,2.2-0.7,2.2-1.7c0-0.9-1-1.7-2.2-1.7h-33.1v-29.1c0-1.5,0-2.6-0.1-3.8l-0.1-2.1l24,0c0.4,0,1-0.1,1.6-0.5l23.7-17.4
	c0.4-0.3,0.6-0.7,0.7-1.1c0-0.4-0.1-0.7-0.4-1.1c-0.8-0.8-2.4-0.9-3.4-0.2l-23,16.9l-23.5,0l-0.3-1.6c-2.2-11.7-7.8-22.4-16.4-30.9
	c-8.1-8.1-18.1-13.6-29.1-16v126.8h48.5L185.2,277.5z M37,274.2c-0.4,0-0.8,0.1-1.1,0.4l-20.3,17.4c-0.3,0.3-0.5,0.7-0.6,1.1
	c0,0.5,0.1,0.9,0.4,1.2c0.6,0.7,1.6,0.7,2.4,0.2l19.8-17l32.5,0h41.9c0-0.4,0-0.8,0-1.3V150.8c-11,2.4-21.1,7.9-29.1,16
	c-8.5,8.5-14.2,19.2-16.4,30.9l-0.3,1.6l-25.9,0l-21.8-16.9c-0.9-0.7-2.3-0.6-3,0.2c-0.3,0.3-0.4,0.7-0.4,1.1c0,0.4,0.3,0.8,0.6,1.1
	l22.4,17.3c0.4,0.3,0.9,0.5,1.4,0.5l26.2,0l-0.1,2.1c-0.1,1.4-0.1,2.6-0.1,3.8v29.3l-2.5-0.2H32.7c-1.1,0-2,0.8-2,1.7
	c0,0.9,0.9,1.7,2,1.7h32.8v33.2L37,274.2z M114.1,12.4c-0.3,0-0.5,0.1-0.8,0.2L73.6,35.3c-0.5,0.3-0.9,0.8-0.9,1.3l0,45.5
	c0,0.5,0.3,1,0.7,1.3l40.6,21.2l40.4-21.1c0.6-0.3,0.9-0.8,0.9-1.4l0-45.5c0-0.5-0.3-1-0.8-1.3l-39.8-22.7
	C114.6,12.4,114.4,12.4,114.1,12.4z M132.8,314.7c-3.9,0-7-3.1-7-7s3.1-7,7-7c3.8,0,7,3.1,7,7S136.6,314.7,132.8,314.7z
	 M132.8,304.8c-1.6,0-3,1.3-3,3s1.3,3,3,3c1.7,0,3-1.3,3-3S134.4,304.8,132.8,304.8z M95.5,314.7c-3.8,0-7-3.1-7-7s3.1-7,7-7
	c3.8,0,7,3.1,7,7S99.3,314.7,95.5,314.7z M95.5,304.8c-1.6,0-3,1.3-3,3s1.3,3,3,3c1.6,0,3-1.3,3-3S97.1,304.8,95.5,304.8z
	 M249.1,276c-6.2,0-11.2-5-11.2-11.2c0-6.2,5-11.2,11.2-11.2c6.2,0,11.2,5,11.2,11.2C260.3,271,255.3,276,249.1,276z M249.1,257.5
	c-4,0-7.2,3.3-7.2,7.2c0,4,3.3,7.2,7.2,7.2c4,0,7.2-3.3,7.2-7.2C256.3,260.8,253.1,257.5,249.1,257.5z M81.1,259.8
	c-3,0-5.5-2.5-5.5-5.5V207c0-3,2.5-5.5,5.5-5.5c3,0,5.5,2.5,5.5,5.5v47.3C86.6,257.3,84.2,259.8,81.1,259.8z M81.1,205.4
	c-0.8,0-1.5,0.7-1.5,1.5v47.3c0,0.8,0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5V207C82.6,206.1,82,205.4,81.1,205.4z M195.8,153.3
	c-10.4,0-18.9-8.5-18.9-18.9s8.5-18.9,18.9-18.9s18.9,8.5,18.9,18.9S206.2,153.3,195.8,153.3z M195.8,119.4
	c-8.2,0-14.9,6.7-14.9,14.9s6.7,14.9,14.9,14.9s14.9-6.7,14.9-14.9S204,119.4,195.8,119.4z M25.1,132c-7.5,0-13.6-6.1-13.6-13.6
	s6.1-13.6,13.6-13.6c7.5,0,13.6,6.1,13.6,13.6S32.6,132,25.1,132z M25.1,108.8c-5.3,0-9.6,4.3-9.6,9.6c0,5.3,4.3,9.6,9.6,9.6
	s9.6-4.3,9.6-9.6C34.7,113.1,30.4,108.8,25.1,108.8z"/>
</svg>


const icon4 = <svg class="position-absolute pb-0 ti-credit-card icon-sm icon-color test-icon" viewBox="0 0 64 64"><path d="M58.13,32.93h-5.6V26.4a1.87,1.87,0,0,0-1.86-1.87H17.93V19.87A14.13,14.13,0,0,1,32,5.89c8.11,0,14.07,7.28,14.07,14h1.8a15.87,15.87,0,0,0-31.74,0v4.66h-2.8a1.87,1.87,0,0,0-1.86,1.87v6.53H5.87A1.87,1.87,0,0,0,4,34.8V49.73A1.87,1.87,0,0,0,5.87,51.6h5.6v6.53A1.87,1.87,0,0,0,13.33,60H50.67a1.87,1.87,0,0,0,1.86-1.87V51.6h5.6A1.87,1.87,0,0,0,60,49.73V34.8A1.87,1.87,0,0,0,58.13,32.93Zm-44.8-6.51H50.67v6.51H13.33ZM50.67,58.19H13.33V51.6H50.67Zm7.6-8.46H5.73V34.8H58.27Z" /><rect x="11.47" y="40.4" width="3.73" height="3.73" /><rect x="18.93" y="40.4" width="3.73" height="3.73" /><rect x="26.4" y="40.4" width="3.73" height="3.73" /><rect x="33.87" y="40.4" width="3.73" height="3.73" /><rect x="41.33" y="40.4" width="3.73" height="3.73" /><rect x="48.8" y="40.4" width="3.73" height="3.73" /></svg>


const icon6 = <svg class="position-absolute pb-0 ti-credit-card icon-sm icon-color test-icon" x="0px" y="0px"
    viewBox="0 0 463 383">
    <g id="_x35_66_x2C__encryption_x2C__files_x2C__folder_x2C__network_x2C__secure">
        <g>
            <path d="M203.5,369.3c-3.4,0-6.7-1.3-9.1-3.8c-2.4-2.3-3.8-5.6-3.8-9.1c0-3.4,1.3-6.7,3.8-9.1c1-1,2.1-1.8,3.3-2.4V323H22.3
			c-0.1,0-0.2,0-0.3,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.4-0.1-0.7-0.3-1-0.5c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0
			c0,0,0,0,0,0c-0.1-0.1-0.1-0.1-0.2-0.2c0,0,0,0,0,0c0,0,0,0,0,0c-0.3-0.3-0.4-0.8-0.4-1.2L18.7,63.6c0-0.5,0.2-1,0.6-1.4
			c0.4-0.4,0.9-0.6,1.4-0.6h28.7V21.9c0-1.1,0.9-2,2-2H163c0.5,0,0.9,0.2,1.3,0.5l47.6,41.2h164.3c1.1,0,2,0.9,2,2v47.1H451
			c0.6,0,1.3,0.3,1.6,0.8c0.4,0.5,0.5,1.2,0.3,1.8l-73.8,208.3c-0.3,0.8-1,1.3-1.9,1.3H209.3v21.9c1.2,0.6,2.3,1.4,3.3,2.4
			c2.4,2.3,3.8,5.6,3.8,9.1c0,3.4-1.3,6.7-3.8,9.1C210.3,367.9,207,369.3,203.5,369.3z M25.1,319h174.6c1.1,0,2,0.9,2,2v25.2
			c0,0.9-0.6,1.6-1.4,1.9c-1.1,0.4-2.1,1-3.1,2c-1.7,1.7-2.6,3.9-2.6,6.3c0,2.4,0.9,4.7,2.6,6.2c1.7,1.7,4,2.7,6.3,2.7
			c2.4,0,4.7-0.9,6.3-2.6c1.7-1.7,2.6-4,2.6-6.3c0-2.4-0.9-4.7-2.6-6.2c-1-1-2.1-1.7-3.2-2.1c-0.8-0.3-1.4-1-1.4-1.9V321
			c0-1.1,0.9-2,2-2h168.5l72.4-204.3H97.3l0,0l-26.7,75.7L63.7,210L25.1,319z M22.7,65.6l1.5,243.9L66.8,189l26.3-74.8
			c0,0,0-0.1,0-0.1c0-0.2,0.1-0.4,0.3-0.7c0.1-0.2,0.2-0.3,0.3-0.5c0,0,0,0,0,0L94,112c0.3-0.8,1-1.3,1.9-1.3h0
			c0.5-0.3,1.1-0.5,1.6-0.6c0.1,0,0.2,0,0.3,0c0.2,0,0.5-0.1,0.8-0.1l26.7,0.5l223.6,0c0.3,0,0.6,0.1,0.9,0.2h24.3V65.6H22.7z
			 M93.2,114C93.2,114,93.2,114,93.2,114C93.2,114,93.2,114,93.2,114z M93.2,114C93.2,114,93.2,114,93.2,114
			C93.2,114,93.2,114,93.2,114z M53.4,61.6h152.4l-43.6-37.7H53.4V61.6z M275.2,288.7h-77c-2.9,0-5.3-2.4-5.3-5.3v-39.3
			c0-6.9,2.8-13.6,7.7-18.4c2.2-2.2,4.7-3.9,7.4-5.2v-16c0-6.4,2.5-12.4,7.1-17c4.3-4.4,10.5-7,16.8-7h9.4c6.3,0,12.5,2.6,17,7.1
			c4.6,4.6,7.1,10.6,7.1,17v15.3c2.8,1.2,5.5,3,7.9,5.2c4.7,4.7,7.2,10.7,7.2,17.1v41.1C280.5,286.3,278.1,288.7,275.2,288.7z
			 M231.9,184.5c-5.3,0-10.4,2.1-14,5.8c-3.8,3.8-5.9,8.9-5.9,14.2v17.3c0,0.8-0.5,1.6-1.3,1.9c-2.7,1.1-5.2,2.7-7.3,4.9
			c-4.1,4.1-6.5,9.7-6.5,15.6v39.3c0,0.7,0.6,1.3,1.3,1.3h77c0.7,0,1.3-0.6,1.3-1.3v-41.1c0-5.3-2.1-10.4-6-14.3
			c-2.3-2.2-5-3.9-7.7-4.8c-0.8-0.3-1.3-1-1.3-1.9v-16.7c0-5.3-2.1-10.4-5.9-14.2c-3.8-3.8-8.9-5.9-14.2-5.9H231.9z M239.5,275.5
			h-5.8c-1.1,0-2-0.9-2-2v-8.2c0-1.7-0.9-3.3-2.4-4c-0.1,0-0.1-0.1-0.2-0.1c-1.7-1.2-3.1-2.8-4-4.5c-1-1.9-1.5-4-1.5-6.2
			c0-3.5,1.4-6.8,3.8-9.2l0.3-0.3c2.4-2.2,5.6-3.5,8.9-3.5c3.5,0,6.8,1.3,9.2,3.8c2.4,2.4,3.8,5.8,3.8,9.2c0,2.4-0.5,4.6-1.6,6.3
			c-1,1.8-2.5,3.4-4.3,4.6c-1.4,0.8-2.2,2.3-2.2,3.9v8.2C241.5,274.6,240.6,275.5,239.5,275.5z M235.7,271.5h1.8v-6.2
			c0-3,1.6-5.8,4.1-7.3c1.2-0.8,2.2-2,3-3.3c0.7-1.2,1-2.6,1-4.3c0-2.4-1-4.7-2.6-6.4c-1.7-1.7-3.9-2.6-6.4-2.6
			c-2.3,0-4.5,0.9-6.1,2.4l-0.3,0.3c-1.7,1.7-2.6,4-2.6,6.4c0,1.5,0.4,3.1,1.1,4.4c0.6,1.2,1.5,2.2,2.7,3.1c2.7,1.5,4.3,4.4,4.3,7.5
			V271.5z M256.8,222h-40.3c-1.1,0-2-0.9-2-2v-15.5c0-4.6,1.9-9.1,5.1-12.3c3.2-3.2,7.7-5.1,12.3-5.1h9.4c4.7,0,9.1,1.8,12.4,5.1
			c3.3,3.3,5.1,7.7,5.1,12.3V220C258.8,221.1,257.9,222,256.8,222z M218.5,218h36.3v-13.5c0-3.6-1.4-7-3.9-9.5
			c-2.5-2.5-5.9-3.9-9.6-3.9h-9.4c-3.5,0-7,1.4-9.5,3.9c-2.5,2.5-3.9,5.9-3.9,9.5V218z M411,146H115v-4h296V146z"/>
        </g>
    </g>
    <g id="Layer_1_1_">
    </g>
</svg>

const icon8 = <svg class="position-absolute pb-0 ti-credit-card icon-sm icon-color test-icon" id="svg18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.15 310.63"><g id="security_setting_icon" data-name="security setting icon"><g id="g14"><path d="M134.08,294.77a8.92,8.92,0,0,1-4.93-1.46c-27.29-15-50.11-34.7-67.83-58.67C28.33,190.56,12.42,133,14,63.69v-.13a9.8,9.8,0,0,1,8.55-9,269.16,269.16,0,0,0,51.31-12.4c16.91-5.86,35-14.09,55.33-25.18a10.5,10.5,0,0,1,9.59,0,384.94,384.94,0,0,0,55.42,25.23,271.18,271.18,0,0,0,51.62,12.4,9.22,9.22,0,0,1,8.24,9.16c1.62,69.33-14.29,126.84-47.28,170.94C189.12,258.29,166.31,278,139,293.3A8.9,8.9,0,0,1,134.08,294.77ZM18,63.85c-1.59,68.4,14.05,125.06,46.49,168.41a203.55,203.55,0,0,0,66.62,57.58l.18.11a5,5,0,0,0,5.5,0l.16-.1c26.83-15,49.25-34.38,66.64-57.6,32.45-43.36,48.09-100.05,46.48-168.47v-.05a5.27,5.27,0,0,0-4.64-5.2h-.1a275.8,275.8,0,0,1-52.44-12.59A388.09,388.09,0,0,1,137,20.48a6.51,6.51,0,0,0-5.95,0C110.63,31.67,92.34,40,75.23,45.93A273.89,273.89,0,0,1,23.11,58.52H23A5.83,5.83,0,0,0,18,63.85Z" /><path d="M115.92,219.85a14.31,14.31,0,0,1-4-.77l-.17-.06-11.36-5c-4.82-1.67-7.51-7-6.26-12.41l0-.1c.36-1.24.62-2.52.9-3.87.14-.72.3-1.46.47-2.23a64,64,0,0,1-7.91-7.88,57.78,57.78,0,0,1-6.22,1.36c-4.87,1.51-10.28-1.19-12.39-6.22L64.3,171.2a10.41,10.41,0,0,1,4.25-13.26c1.13-.64,2.2-1.3,3.27-2,.74-.46,1.49-.92,2.26-1.37a46.85,46.85,0,0,1,0-11.35l-.73-.43a40.87,40.87,0,0,0-4.63-2.49l-.29-.15a11,11,0,0,1-4.13-13.55L69,115.21A11.12,11.12,0,0,1,81.43,109c1.19.34,2.38.66,3.58,1l2.56.69a65.83,65.83,0,0,1,8-8.13c-.24-1-.44-1.92-.64-2.91s-.45-2.18-.74-3.34a10.71,10.71,0,0,1,6.21-12.41l11.44-4.7A10.8,10.8,0,0,1,125,83.34l.22.39c1.07,1.87,2.1,3.66,3.14,5.29a86.43,86.43,0,0,1,11.38,0c1.14-1.8,2.29-3.82,3.33-5.64a10.83,10.83,0,0,1,13.27-4.21l11.42,4.7A10.69,10.69,0,0,1,174,96.28c-.58,2.3-1.16,4.38-1.69,6.22a67.31,67.31,0,0,1,8.19,8.18c.85-.24,1.72-.47,2.6-.7,1.2-.32,2.41-.65,3.54-1a11.12,11.12,0,0,1,12.46,6.13l4.73,11.51a11,11,0,0,1-4.14,13.54l-.28.15a40,40,0,0,0-4.67,2.51l-.68.4a48,48,0,0,1,0,11.36c.76.45,1.5.91,2.24,1.36,1.07.66,2.15,1.32,3.3,2a10.38,10.38,0,0,1,4.22,13.26l-4.69,11.43c-2.11,5.05-7.53,7.75-12.39,6.24a56,56,0,0,1-6.29-1.38,66.63,66.63,0,0,1-8.15,7.94c.54,2.07,1.09,4,1.68,6.06l0,.1c1.26,5.43-1.43,10.74-6.26,12.41l-11.53,5.07c-5.09,1.71-10.71-.25-13.11-4.55-1.13-1.71-2.27-3.67-3.38-5.6a46.68,46.68,0,0,1-11.33,0c-1.12,1.95-2.28,3.94-3.44,5.67A10.74,10.74,0,0,1,115.92,219.85Zm-2.65-4.53a10.23,10.23,0,0,0,2.65.53,6.72,6.72,0,0,0,5.69-3.42c1.2-1.78,2.34-3.76,3.54-5.85l1.16-2,1.35.21a43.17,43.17,0,0,0,12.84,0l1.35-.21.9,1.57c1.24,2.15,2.51,4.38,3.75,6.23l.09.15c1.45,2.66,5,3.84,8.29,2.79l11.52-5.08c3-1,4.52-4.21,3.74-7.69-.72-2.5-1.36-4.79-2-7.41l-.34-1.31,1.1-.8a61.86,61.86,0,0,0,9.31-9l1-1.09,1.2.34a55.21,55.21,0,0,0,7.13,1.62l.35.09c2.94,1,6.28-.75,7.62-3.92l4.69-11.43a6.41,6.41,0,0,0-2.47-8.23l0,0c-1.2-.69-2.31-1.37-3.42-2.05s-2.15-1.32-3.31-2l-1.19-.69.21-1.35a43.31,43.31,0,0,0,0-12.86l-.21-1.36,1.19-.68c.62-.35,1.22-.71,1.8-1.05a42.28,42.28,0,0,1,5-2.67,7,7,0,0,0,2.46-8.56l-4.7-11.45a7,7,0,0,0-7.76-3.85c-1.08.31-2.31.63-3.55,1s-2.57.69-3.77,1l-1.27.36-.83-1a64.84,64.84,0,0,0-9.49-9.47l-1-.84.37-1.27c.61-2.09,1.32-4.56,2-7.33a6.68,6.68,0,0,0-3.88-7.75l-11.42-4.69a6.84,6.84,0,0,0-8.29,2.53c-1.24,2.17-2.67,4.67-4.08,6.8l-.65,1-1.18-.09a87.19,87.19,0,0,0-13.13,0l-1.17.09-.65-1c-1.32-2-2.64-4.27-3.91-6.49l-.2-.35a6.8,6.8,0,0,0-8.25-2.51l-11.45,4.71A6.67,6.67,0,0,0,98,95.31c.31,1.24.55,2.39.78,3.5.27,1.34.53,2.61.88,3.85l.34,1.2-.92.83A62.32,62.32,0,0,0,90,114.13l-.83,1.13-1.34-.38c-1.21-.35-2.51-.7-3.81-1s-2.44-.65-3.58-1a7.07,7.07,0,0,0-7.72,3.94L68,128.17a7,7,0,0,0,2.46,8.57,44.26,44.26,0,0,1,5,2.65c.59.35,1.19.71,1.82,1.07l1.18.68-.19,1.34a43.43,43.43,0,0,0,0,12.88l.21,1.36-1.2.68c-1.16.66-2.24,1.32-3.32,2s-2.21,1.36-3.41,2a6.43,6.43,0,0,0-2.5,8.24l4.71,11.45c1.32,3.17,4.67,4.89,7.6,3.91l.35-.09a55.41,55.41,0,0,0,7.13-1.62l1.28-.37.83,1a59.84,59.84,0,0,0,9.11,9.1l1,.8-.31,1.24c-.28,1.14-.51,2.24-.73,3.3-.29,1.41-.56,2.75-1,4.12-.79,3.48.78,6.71,3.73,7.69l.18.07Z" /></g></g><g id="DHlx2e"><path d="M168.17,149.37a34.8,34.8,0,1,1-34.27-34.79A34.81,34.81,0,0,1,168.17,149.37Zm-50.85.93c0,.14,0,.24,0,.33a62.79,62.79,0,0,0,1.21,11.28c.22,1.06.48,2.12.71,3.18.05.26.14.4.47.37a11.25,11.25,0,0,1,1.16,0l11.17,0,.42,0V150.3Zm15.13-1.85V133.32h-.24q-6.3,0-12.62,0a.42.42,0,0,0-.3.28c-.31,1.28-.63,2.57-.88,3.86a55.8,55.8,0,0,0-1,8.25c0,.91,0,1.82,0,2.76Zm1.86-15.14v15.13h15.13v-.36a62.42,62.42,0,0,0-.92-9.64c-.29-1.57-.66-3.12-1-4.69a.48.48,0,0,0-.59-.45c-.65,0-1.31,0-2,0H134.31Zm0,17v15.14l.27,0,12.5,0c.29,0,.38-.13.44-.37.27-1.27.58-2.52.83-3.79a58.47,58.47,0,0,0,1-8.24c0-.92,0-1.83,0-2.78Zm16.91-1.84h15.16v-.38a33.92,33.92,0,0,0-1.39-8.24,33.28,33.28,0,0,0-2.61-6.22.55.55,0,0,0-.56-.31H149.71l-.49,0A62.54,62.54,0,0,1,151.22,148.45Zm-35.69,1.85H100.37c0,.13,0,.22,0,.31.24,1.92.4,3.85.76,5.75a30.36,30.36,0,0,0,3.07,8.48,1,1,0,0,0,1,.63c3.76,0,7.53,0,11.29,0h1A62.08,62.08,0,0,1,115.53,150.3Zm0-1.85a63.75,63.75,0,0,1,2-15.15H104.91a.51.51,0,0,0-.53.29,32,32,0,0,0-2.37,5.47,31.63,31.63,0,0,0-1.48,7c-.08.79-.13,1.58-.19,2.39Zm33.69,17h12.61a.51.51,0,0,0,.55-.31,33,33,0,0,0,2.45-5.7A34.2,34.2,0,0,0,166.3,152c0-.56.06-1.13.09-1.7H151.22A62.67,62.67,0,0,1,149.22,165.45Zm-14.93,16.88a8.65,8.65,0,0,0,3.34-1.13,16.18,16.18,0,0,0,5.36-5.46,34.12,34.12,0,0,0,3.2-6.5c.25-.64.44-1.3.67-2H134.29Zm12.54-50.82a.9.9,0,0,0,0-.18,33.46,33.46,0,0,0-4.68-9.56,14,14,0,0,0-5.43-4.69,8.54,8.54,0,0,0-2.4-.66v15.09Zm-14.37-15.09a8.5,8.5,0,0,0-3.36,1.15,15.64,15.64,0,0,0-5,5,32.64,32.64,0,0,0-3.52,7c-.23.62-.44,1.25-.68,1.93h12.59Zm0,50.8H119.87c.13.37.25.69.36,1a31.8,31.8,0,0,0,4.33,8.66,13.59,13.59,0,0,0,5.6,4.81,20,20,0,0,0,2.3.72Zm-5.94,14.42a21.88,21.88,0,0,1-4.47-5.27,36.62,36.62,0,0,1-3.91-8.82.41.41,0,0,0-.47-.34c-.87,0-1.73,0-2.59,0l-9.07,0c-.11,0-.21,0-.4,0A33.05,33.05,0,0,0,126.52,181.64Zm-20.91-50.15c.19,0,.3,0,.41,0h11.66a.4.4,0,0,0,.45-.31c.7-1.86,1.35-3.75,2.15-5.56a24.94,24.94,0,0,1,4-6.36c.69-.77,1.41-1.53,2.05-2.22A33.24,33.24,0,0,0,105.61,131.49Zm55.53,0a32.87,32.87,0,0,0-8-8.62,31.8,31.8,0,0,0-12.91-5.79c0,.09.11.12.18.17a21.65,21.65,0,0,1,5,6.25,38.29,38.29,0,0,1,3.24,7.67.37.37,0,0,0,.43.32l2.8,0,8.69,0Zm-20.84,50.1a32.6,32.6,0,0,0,16.36-8.88,31,31,0,0,0,4.44-5.49l-.15-.05c-4,0-8,0-12,0a.53.53,0,0,0-.35.29c-.72,1.85-1.37,3.74-2.16,5.55a23.82,23.82,0,0,1-3.69,5.94C142,179.93,141.11,180.78,140.3,181.64Z" /><path d="M133.34,184.68h-.44a35.3,35.3,0,1,1,35.77-35.32,35.32,35.32,0,0,1-35.33,35.32Zm.08-69.61a34.3,34.3,0,1,0,34.25,34.3h0a34.35,34.35,0,0,0-33.78-34.28Zm-.47,68-.64-.2-.75-.21a13.63,13.63,0,0,1-1.6-.53,13.89,13.89,0,0,1-5.8-5,32.83,32.83,0,0,1-4.41-8.79c-.07-.22-.15-.43-.23-.66l-.37-1H133Zm-12.37-15.37.12.34A31.91,31.91,0,0,0,125,176.6a13,13,0,0,0,5.39,4.64,10.55,10.55,0,0,0,1.47.48l.13,0v-14Zm13.21,15.17V166.74h13.76l-.43,1.32c-.15.47-.29.92-.46,1.36a35,35,0,0,1-3.25,6.6,16.56,16.56,0,0,1-5.53,5.61,9,9,0,0,1-3.53,1.2Zm1-15.16v14a8.27,8.27,0,0,0,2.59-1,15.49,15.49,0,0,0,5.19-5.3,34.47,34.47,0,0,0,3.16-6.41c.16-.42.3-.86.44-1.3v0Zm-6.38,14.84-2-.45a33.74,33.74,0,0,1-21.22-14.59l-.46-.69,1-.11.29,0,9.06,0h1.12c.49,0,1,0,1.47,0a.92.92,0,0,1,1,.69,36.56,36.56,0,0,0,3.86,8.7,21.39,21.39,0,0,0,4.37,5.16Zm-21.88-14.86a32.12,32.12,0,0,0,18.23,13,23.7,23.7,0,0,1-3.14-4.06,37.43,37.43,0,0,1-4-8.92c-.53,0-1,0-1.48,0h-1.1Zm32.33,14.7,1.08-1.13.77-.8c.57-.58,1.16-1.19,1.7-1.81a23,23,0,0,0,3.61-5.81c.51-1.16,1-2.38,1.41-3.55q.36-1,.75-2a1,1,0,0,1,.81-.61h12l.72.27-.24.55a31.32,31.32,0,0,1-4.5,5.57,32.9,32.9,0,0,1-16.63,9Zm10.26-14.69c-.27.65-.52,1.29-.76,1.94-.44,1.19-.91,2.42-1.43,3.6a23.75,23.75,0,0,1-3.77,6.07c-.43.49-.88,1-1.33,1.44a32.32,32.32,0,0,0,14.48-8.37,31.09,31.09,0,0,0,3.9-4.69Zm-2-1.76h0l-9.56,0h-3.14l-.47,0-.1-.48V149.79h16v.5c0,.3,0,.59,0,.89,0,.64,0,1.28,0,1.91a58.05,58.05,0,0,1-1,8.31c-.16.84-.35,1.66-.54,2.49l-.3,1.31A.88.88,0,0,1,147.08,166Zm-12.27-1h2.71l9.51,0c.1-.47.2-.89.3-1.3.18-.82.37-1.64.53-2.46a58.84,58.84,0,0,0,1-8.17c0-.61,0-1.23,0-1.85v-.4h-14Zm-14,1-.43,0a3.75,3.75,0,0,0-.67,0,.86.86,0,0,1-1-.77l-.3-1.31c-.14-.62-.28-1.24-.41-1.87a62.76,62.76,0,0,1-1.22-11.36v-.85H133v16.09l-.59,0-.33,0-11.17,0Zm-.81-1,.43,0a2.51,2.51,0,0,1,.39,0L132,165V150.8H117.82a61.91,61.91,0,0,0,1.2,11c.13.62.27,1.23.41,1.85.1.43.19.86.29,1.29Zm-14.86,1a1.47,1.47,0,0,1-1.44-.9,31.63,31.63,0,0,1-3.12-8.62c-.25-1.34-.4-2.71-.55-4-.07-.58-.13-1.16-.21-1.74a2.44,2.44,0,0,1,0-.28v-.6H116v.49a61.91,61.91,0,0,0,2,15l.17.63h-4.37c-2.87,0-5.74,0-8.61,0Zm-4.3-15.17c.07.5.12,1,.18,1.51.15,1.3.3,2.66.55,4a30,30,0,0,0,3,8.34.53.53,0,0,0,.57.36c2.87,0,5.74,0,8.61,0h3.07A62.86,62.86,0,0,1,115,150.8ZM161.83,166H148.57l.17-.63a62,62,0,0,0,2-15v-.49h16.19l0,1.07c0,.4,0,.79-.07,1.17a33.63,33.63,0,0,1-4,13.33A1,1,0,0,1,161.83,166Zm-7.45-1h7.45l.11,0A32.46,32.46,0,0,0,165.8,152c0-.37,0-.74.07-1.12v0H151.71A63.25,63.25,0,0,1,149.87,165h4.51ZM116,149H99.8l.1-1.32c0-.55.08-1.08.13-1.61a32.64,32.64,0,0,1,1.5-7.12,33.26,33.26,0,0,1,2.41-5.55,1,1,0,0,1,1-.55h13.27l-.16.63a62.55,62.55,0,0,0-2,15Zm-15.14-1H115a63.85,63.85,0,0,1,1.84-14.15h-12a27.72,27.72,0,0,0-2.43,5.41,31.82,31.82,0,0,0-1.46,6.9c0,.53-.08,1-.12,1.59ZM133,149h-16v-.5c0-.29,0-.58,0-.87,0-.65,0-1.28,0-1.92a58.4,58.4,0,0,1,1-8.31c.22-1.13.5-2.26.76-3.35l.13-.54a.91.91,0,0,1,.79-.66c3.86,0,7.72,0,11.57,0h1.05l.19,0,.45,0,.1.46Zm-15-1h14V133.81h-.79c-3.81,0-7.61,0-11.42,0l-.1.43c-.26,1.08-.53,2.2-.74,3.31a56.62,56.62,0,0,0-1,8.17c0,.61,0,1.23,0,1.86C117.91,147.69,117.91,147.82,117.91,148Zm1.68-14.15ZM166.88,149H150.73v-.49a61.61,61.61,0,0,0-2-15l-.15-.6.79,0a1.9,1.9,0,0,1,.34,0h12.12a1,1,0,0,1,1,.57,33.3,33.3,0,0,1,4.06,14.68v.9Zm-15.17-1h14.16a33,33,0,0,0-1.36-8,33.38,33.38,0,0,0-2.57-6.13s0,0-.11,0h-12A62.92,62.92,0,0,1,151.71,148Zm-1.77,1H133.81V132.8h11.76c.45,0,.91,0,1.35,0a1,1,0,0,1,1.11.85c.12.59.25,1.18.38,1.77.21,1,.42,2,.6,2.93a62.53,62.53,0,0,1,.93,9.72v.87Zm-15.13-1h14.12a60.12,60.12,0,0,0-.9-9.4c-.18-1-.39-1.94-.6-2.9-.13-.6-.26-1.19-.38-1.79,0,0,0,0,0-.06H147c-.47,0-.95,0-1.42,0H134.81Zm17-15.88h-2.7a.89.89,0,0,1-.92-.67A37.78,37.78,0,0,0,145,123.8a21.19,21.19,0,0,0-4.9-6.11.78.78,0,0,1-.33-.39l-.3-.83.87.17a32.5,32.5,0,0,1,13.11,5.88,33.31,33.31,0,0,1,8.15,8.74l.5.78-10.2,0Zm-2.68-1h2.77l8.35,0a32.33,32.33,0,0,0-7.4-7.72,31.7,31.7,0,0,0-10.87-5.27,23.63,23.63,0,0,1,3.89,5.26A38.22,38.22,0,0,1,149.09,131Zm-31.41,1H106l-.3,0-1-.12.45-.68a33.87,33.87,0,0,1,21.07-14.61l1.57-.36-1.69,1.84c-.47.5-1,1-1.44,1.57a23.82,23.82,0,0,0-4,6.22c-.6,1.36-1.13,2.79-1.63,4.17l-.51,1.36A.9.9,0,0,1,117.68,132Zm-11.15-1h11.13l.51-1.35c.51-1.39,1-2.84,1.66-4.22A24.89,24.89,0,0,1,124,119l.9-1A32.73,32.73,0,0,0,106.53,131ZM133,132h-13.8l.45-1.29c.16-.45.31-.89.47-1.32a33,33,0,0,1,3.58-7.14,16.31,16.31,0,0,1,5.19-5.14,9.14,9.14,0,0,1,3.55-1.21l.56-.06Zm-12.39-1H132V117a8.19,8.19,0,0,0-2.61,1,15.26,15.26,0,0,0-4.87,4.83,32.19,32.19,0,0,0-3.46,6.93C120.86,130.17,120.72,130.59,120.57,131Zm26.26,1h-13V115.84l.57.08a9.07,9.07,0,0,1,2.53.7,14.3,14.3,0,0,1,5.64,4.86,33.73,33.73,0,0,1,4.75,9.7,1.31,1.31,0,0,1,0,.22l0,.54Zm-12-1h11.37a32.27,32.27,0,0,0-4.44-8.94,13.35,13.35,0,0,0-5.24-4.54,7.44,7.44,0,0,0-1.69-.52Z" /></g></svg>

const icon9 =
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 512 512">
        <path class="st0" d="M449.2,169c-3-3.1-7.3-4.9-11.9-4.9c-4.7,0-8.9,1.9-11.9,4.9c-3,3.1-4.9,7.3-4.9,11.9c0,4.6,1.9,8.9,4.9,11.9
	c3,3,7.3,4.9,11.9,4.9c4.7,0,8.9-1.9,11.9-4.9c3-3.1,4.9-7.3,4.9-11.9C454.1,176.2,452.2,172,449.2,169z"/>
        <path class="st0" d="M74.5,151.1c-3-3.1-7.3-4.9-11.9-4.9c-4.7,0-8.9,1.9-11.9,4.9c-3.1,3.1-4.9,7.3-4.9,11.9
	c0,4.7,1.9,8.9,4.9,11.9c3,3.1,7.3,4.9,11.9,4.9c4.7,0,8.9-1.9,11.9-4.9c3.1-3.1,5-7.3,5-11.9C79.5,158.4,77.6,154.2,74.5,151.1z"/>
        <path class="st0" d="M134.2,408.2c-3-3.1-7.3-5-11.9-5c-4.7,0-8.9,1.9-11.9,5c-3,3-4.9,7.3-4.9,11.9s1.9,8.9,4.9,11.9
	c3,3.1,7.3,5,11.9,5c4.7,0,8.9-1.9,11.9-5c3.1-3.1,5-7.3,5-11.9c0-4.6-1.8-8.7-4.8-11.7L134.2,408.2z"/>
        <path class="st0" d="M397.1,311.8l-0.2-0.4l-37.3-67.1c-0.1-0.2-0.3-0.4-0.3-0.6l-11-19.8L221.1,444.4h249.6L397.1,311.8z" />
        <rect x="336.3" y="285" class="st0" width="19.2" height="100.9" />
        <rect x="336.3" y="411.6" class="st0" width="19.2" height="15.8" />
        <path d="M249.9,394.5c0-19.9,0-39.6,0-59.4c11.5,0,22.9,0,34.3,0l4.7-8.1c-12.6,0-25.1,0-37.7-0.1c-0.4,0-0.7,0-1.2-0.1
	c0-23.1,0-46.1,0-69.2c23.2,0,46.1,0,68.8,0c0,4.3,0.2,8.5,0,12.7c-0.1,1.9-0.2,3.7-0.3,5.6l8.9-15.4c0-0.9,0-1.8,0.1-2.8
	c0.5,0,1,0,1.5,0l4.9-8.5c-2.2,0-4.3,0-6.4,0c-0.4-23.4-3.1-46.4-9.2-69.2c0.9,0,1.6-0.1,2.2-0.1c18.5,0,37,0.1,55.4,0.1
	c1.2,0,1.9,0.3,2.6,1.4c5,9.1,8.9,18.6,11.9,28.5c3.8,12.3,5.8,24.9,6.4,37.7c0,0.5,0,1,0,1.7c-11.5,0-22.9,0-34.4,0l4.7,8.5
	c9.9,0,19.8,0,29.7,0c-0.1,2.6-0.2,5.2-0.4,7.8c-1,11.3-3.1,22.4-6.5,33.3l5.4,9.7c6.3-17.2,9.8-35.8,9.7-55
	c0.1-87.7-70.9-158-156.8-159.2c-89.9-1.2-160.6,71.1-161.6,157c-1,88.3,68.9,158.2,153,161.3L249.9,394.5z M319.2,247.4
	c0,0.5,0,1,0,1.7c-23.1,0-46.1,0-69.2,0c0-22.9,0-45.9,0-69.2c0.7,0,1.4,0,2,0c15.6,0,31.2,0,46.8,0c3,0,6,0.1,9,0
	c1.7-0.1,2.4,0.5,2.7,2.1c1.5,7.2,3.2,14.3,4.5,21.5C317.7,217.9,318.8,232.6,319.2,247.4z M336,132.3
	c14.5,10.8,26.7,23.8,36.8,39.4c-1.2,0-2,0-2.7,0c-13.3,0-26.5,0.1-39.8,0.1c-4.3,0-8.5-0.1-12.8-0.1c-1.1,0-1.7-0.4-2-1.5
	c-3.7-12.2-8.5-24-14.8-35.1c-6.1-10.8-13.3-20.7-22.9-28.6c-0.3-0.2-0.7-0.4-0.8-0.8C298.7,110.2,318.3,119.1,336,132.3z
	 M249.9,102.6c3.9,0.5,7.5,1.4,11,3c10.4,4.7,18.2,12.5,24.9,21.5c9.8,13.3,16.3,28.2,21.4,43.7c0.1,0.2,0.1,0.5,0.1,0.8
	c-19.1,0-38.2,0-57.4,0C249.9,148.6,249.9,125.7,249.9,102.6z M241.5,404.5c-3.7-1.1-7.2-1.9-10.5-3.3c-10.8-4.6-18.8-12.7-25.6-22
	c-8.8-12.1-15-25.5-19.8-39.6c-0.5-1.5-1.1-2.9-1.7-4.6c19.3,0,38.3,0,57.6,0C241.5,358.1,241.5,381.1,241.5,404.5z M241.5,326.8
	c-0.7,0-1.3,0.1-1.9,0.1c-17,0-34,0.1-51.1,0.1c-1.8,0-3.6-0.2-5.3,0c-1.5,0.2-1.9-0.5-2.1-1.7c-1.1-4.8-2.2-9.7-3.2-14.5
	c-3.6-17-5.1-34.2-5.5-51.6c0-0.4,0-0.9,0-1.5c23.2,0,46.2,0,69.3,0C241.5,280.6,241.5,303.6,241.5,326.8z M172.7,236.5
	c0.6-12.7,2.1-25.3,4.5-37.7c1.2-5.9,2.6-11.8,4-17.7c0.1-0.5,0.9-1.3,1.4-1.3c19.3,0,38.5,0,57.8,0c0.3,0,0.6,0,1.1,0.1
	c0,23,0,46,0,69.2c-23.1,0-46.1,0-68.8,0C172.7,244.8,172.5,240.6,172.7,236.5z M241.5,102.6c0,23,0,46,0,69.1
	c-19.2,0-38.2,0-57.6,0c1.1-3.1,2-6,3.1-8.8c4.2-11.3,9.3-22.2,16.1-32.2c6.2-9.1,13.4-17.2,23-22.8
	C230.9,105.1,235.9,103.2,241.5,102.6z M213.7,105.6c-2.9,3.2-6.2,6.6-9.4,10.2c-7.7,8.7-13.8,18.5-18.5,29.1
	c-3.7,8.3-6.7,16.9-9.9,25.4c-0.4,1.1-1,1.4-2.1,1.4c-17.8,0-35.6,0-53.4,0c-0.5,0-1-0.1-1.9-0.2
	C142.1,136.8,173.7,114.8,213.7,105.6z M95.4,238.2c1-10.9,3.3-21.6,6.8-32.1c2.9-8.7,6.5-17,10.9-25c0.6-1,1.2-1.3,2.4-1.3
	c18.5,0,37,0,55.5,0c0.7,0,1.4,0,2.3,0c-6,22.8-8.7,45.8-9.1,69.3c-23.2,0-46.2,0-69.5,0C94.9,245.4,95.1,241.8,95.4,238.2z
	 M112.2,324.1c-6.4-12.3-11.5-25.2-14.1-38.8c-1.6-8.7-2.3-17.5-3.5-26.3c-0.1-0.4,0-0.9,0-1.5c23.1,0,46.1,0,69.4,0
	c0.5,23.5,3,46.5,9.2,69.3c-1.8,0-3.3,0-4.8,0c-17.2,0-34.4-0.1-51.6,0.1C114.4,327,113.3,326.1,112.2,324.1z M118.7,335.2
	c0.9-0.1,1.4-0.2,1.8-0.2c13.8,0,27.7-0.1,41.5-0.1c4,0,7.9,0.1,11.9,0.1c1.2,0,1.8,0.4,2.2,1.6c4.3,14.2,10.1,27.7,17.9,40.3
	c5.6,9,12.2,17.2,20.5,24.1C173.8,391.9,142.1,369.9,118.7,335.2z"/>
        <g>
            <path d="M236.1,446.4h-15c-0.7,0-1.4-0.4-1.7-1c-0.4-0.6-0.4-1.4,0-2l7.5-13l3.5,2l-5.8,10h11.5V446.4z" />
            <path d="M257.1,386.1l-3.5-2l16-27.8l3.5,2L257.1,386.1z M299.8,312l-3.5-2l16-27.8l3.5,2L299.8,312z" />
            <path d="M353.9,238l-5.6-10l-5.7,9.9l-3.5-2l7.5-13c0.4-0.6,1-1,1.7-1c0.7,0,1.4,0.4,1.7,1l7.3,13.1L353.9,238z" />
            <rect x="383.9" y="277.1" transform="matrix(0.8742 -0.4855 0.4855 0.8742 -92.9989 223.9943)" width="4" height="28.8" />
            <path d="M423.4,361.1C423.4,361.1,423.4,361.1,423.4,361.1c-0.7,0-1.4-0.4-1.7-1l-7.3-13.1l3.5-1.9l5.6,10c1.8-3.3,3.6-6.7,5.2-10
		l3.6,1.8c-2.2,4.5-4.6,9-7.1,13.4C424.8,360.7,424.1,361.1,423.4,361.1z"/>
            <path d="M245.5,463.4c-2.7,0-5.4-0.1-8.2-0.2l0.2-4c9.5,0.4,19.2,0.1,28.7-0.9l0.4,4C259.6,463.1,252.5,463.4,245.5,463.4z
		 M189.3,455.6c-9.4-2.6-18.6-6-27.5-9.9l1.6-3.7c8.7,3.9,17.8,7.1,27,9.7L189.3,455.6z M108,411.2c-3.5-3.1-6.9-6.3-10.1-9.6
		l2.8-2.8c3.1,3.2,6.4,6.3,9.7,9.2 M68,363.2c-5-8.3-9.5-17.1-13.3-26l3.7-1.6c3.7,8.8,8.1,17.4,13,25.5L68,363.2z M448.3,300.8
		l-3.9-0.9c2.1-9.3,3.5-18.9,4.2-28.4l4,0.3C451.8,281.6,450.4,291.3,448.3,300.8z M41.1,290.4c-1.6-9.6-2.6-19.4-2.8-29.1l4-0.1
		c0.3,9.5,1.2,19.1,2.8,28.6L41.1,290.4z M446.6,223.9c-1.5-9.4-3.7-18.8-6.5-27.9l3.8-1.2c2.9,9.3,5.1,18.9,6.6,28.5L446.6,223.9z
		 M46.6,213.7l-3.9-0.8c2-9.5,4.7-19,8.1-28.1l3.8,1.4C51.2,195,48.6,204.3,46.6,213.7z M420.8,152.3c-4.9-8.2-10.3-16.1-16.3-23.6
		l3.1-2.5c6.1,7.6,11.7,15.7,16.6,24L420.8,152.3z M76.1,143.5l-3.3-2.2c1.7-2.5,3.4-5,5.2-7.5c4-5.4,8.2-10.7,12.6-15.7l3,2.7
		c-4.3,4.9-8.5,10.1-12.4,15.4C79.4,138.6,77.7,141,76.1,143.5z M370.5,95.2c-1.7-1.3-3.3-2.6-5-3.8c-6-4.4-12.4-8.5-18.8-12.2
		l2-3.5c6.6,3.8,13,7.9,19.2,12.4c1.7,1.3,3.5,2.6,5.1,3.9L370.5,95.2z M129.2,89l-2.3-3.3c8-5.6,16.4-10.6,25.1-15l1.8,3.6
		C145.3,78.6,137,83.6,129.2,89z M302.7,60.5c-9.2-2.7-18.6-4.7-28-6.1l0.6-4c9.6,1.4,19.3,3.5,28.6,6.2L302.7,60.5z M198.7,57.9
		l-0.9-3.9c9.5-2.2,19.2-3.8,28.9-4.7l0.4,4C217.5,54.2,207.9,55.7,198.7,57.9z"/>
            <path d="M314.3,451.7L313,448c1.4-0.5,2.9-1,4.3-1.6h-4.7v-4h15c0.9,0,1.8,0.7,2,1.6c0.2,0.9-0.3,1.9-1.2,2.2
		C323.8,448.2,319,450.1,314.3,451.7z"/>
            <rect x="265.5" y="442.4" width="17.6" height="4" />
        </g>
    </svg>



export default function (props) {

    const { data: testsData, loading, error } = useQuery(FEATURED_TESTS_QUERY);
    const [tests, setTests] = useState([])

    useEffect(() => {
        if (testsData?.tests.length > 0) {
            const featuredTests = testsData.tests.filter((a) =>
                a.status === 'Approved' && a.is_pinned
            )
            return setTests(featuredTests)
        }
    }, [testsData])

    return (
        <section class="promo-section mt-5 mb-5 ptb-5">
            <div class="container">
                <div class="d-flex justify-content-between">
                    <h2 class="titles mb-5 section-title">Test your knowledge</h2>
                    <span class="see-more-link d-none d-md-block">see more</span>
                </div >
                <div class="row">
                    {tests?.map((test, i) =>
                        <SingleTest key={test.id} index={i} {...test} />
                    )}
                </div >
            </div >
        </section >
    );
}

const SingleTest = (props) => {
    const { title, description, index } = props
    const icons = [
        { id: 3, svg: icon3 },
        { id: 0, svg: icon4 },
        { id: 1, svg: icon6 },
        { id: 2, svg: icon8 },
    ]
    const getIcon = i => icons[i].svg;

    return (
        <div class="col-lg-3 col-sm-6 mb-3" >
            <div class="card test-card test-hover">
                <div class="pb-2 pr-5 pl-5 text-center tag-icon ">
                    {/* <img className="yellow-tag" src={tag} alt="" /> */}
                    {tagSVG}
                    <span className="d-flex justify-content-center">
                        {getIcon(index)}
                    </span>
                </div >
                <div class=" pt-2 pb-3 pr-2 pl-2 text-center"><h5>{title}</h5>
                    <p class="text-muted mb-0 pr-2 pl-2 feat-test-description">{description}</p>
                </div >
            </div >
        </div>
    )
}


// import React from "react";
// // import SingleTest from "./SingleTest";

// const tag = './yellow-tag.svg';
// const icon = './icon.svg';

// export default function (props) {

//     return (
//         <section class="promo-section mt-5 mb-5 ptb-5">
//             <div class="container">
//                 <div class="d-flex justify-content-between">
//                     <h2 class="titles mb-5 section-title">Test your knowledge</h2>
//                     <span class="see-more-link d-none d-md-block">see more</span>
//                 </div >
//                 <div class="row">

//                     <SingleTest />
//                     <SingleTest />
//                     <SingleTest />
//                     <SingleTest />

//                 </div >
//             </div >
//         </section >
//     );
// }

// const SingleTest = () => {

//     return (
//         <div class="col-lg-3 col-sm-6 mb-3" >
//             <div class="card test-card test-hover">
//                 <div class="pb-2 pr-5 pl-5 text-center tag-icon ">
//                     {/* <img className="yellow-tag" src={tag} alt="" /> */}
//                     {"tagSVG"}
//                     <span className="d-flex justify-content-center">
//                         {"iconSVG"}
//                         {/* <img class="position-absolute pb-0 ti-credit-card icon-sm icon-color test-icon" src={icon} alt="" /> */}
//                     </span>
//                 </div >
//                 <div class=" pt-2 pb-3 pr-2 pl-2 text-center"><h5>Test Name</h5>
//                     <p class="text-muted mb-0 pr-2 pl-2">All components are built to be used in any combination.</p>
//                 </div >
//             </div >
//         </div>
//     )
// }