/* Add to quizzes.html <style> */

/* YouTube-style Range Slider */
input[type=range] {
    -webkit-appearance: none; 
    background: transparent; 
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #ff0000;
    cursor: pointer;
    margin-top: -4px; 
    opacity: 0; 
    transition: opacity 0.2s;
}

/* Show thumb on hover */
.group\/timeline:hover input[type=range]::-webkit-slider-thumb {
    opacity: 1;
}

input[type=range]::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #ff0000;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}

.group\/timeline:hover input[type=range]::-moz-range-thumb {
    opacity: 1;
}
