//navigation
function adaptiveNav() {
    let nav = document.getElementById("nav");
    if (nav.className === "navigation") {
        nav.className += " responsive";
    } else {
        nav.className = "navigation";
    }
}

//slider
"use strict";
let groupSlider = (function () {
    return function (selector) {
        let mainElement = document.querySelector(selector), 
        wrapper = mainElement.querySelector(".slider-wrapper"), 
        sliderItem = mainElement.querySelectorAll(".slider-item"), 
        control = mainElement.querySelectorAll(".control"), 
        wrapperWidth = parseFloat(getComputedStyle(wrapper).width), 
        itemWidth = parseFloat(getComputedStyle(sliderItem[0]).width),    
        leftItem = 0, 
        transform = 0, 
        step = itemWidth / wrapperWidth * 100, //transformation step
        items = [];
        //array filling
        sliderItem.forEach(function (item, index) {
            items.push({ item: item, position: index, transform: 0 });
        });
        
        let position = {
            getItemMin: function () {
                let indexItem = 0;
                items.forEach(function (item, index) {
                    if (item.position < items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function () {
                let indexItem = 0;
                items.forEach(function (item, index) {
                    if (item.position > items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function () {
                return items[position.getItemMin()].position;
            },
            getMax: function () {
                return items[position.getItemMax()].position;
            }
        };
        
        let transformItem = function (direction) {
            let nextItem;
            if (direction === "right") {
                leftItem++;
                if ((leftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    items[nextItem].position = position.getMax() + 1;
                    items[nextItem].transform += items.length * 100;
                    items[nextItem].item.style.transform = "translateX(" + items[nextItem].transform + "%)";
                }
                transform -= step;
            }
            if (direction === "left") {
                leftItem--;
                if (leftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    items[nextItem].position = position.getMin() - 1;
                    items[nextItem].transform -= items.length * 100;
                    items[nextItem].item.style.transform = "translateX(" + items[nextItem].transform + "%)";
                }
                transform += step;
            }
            wrapper.style.transform = "translateX(" + transform + "%)";
        };
        
        let controlClick = function (e) {
            if (e.target.classList.contains("control")) {
                e.preventDefault();
                let direction = e.target.classList.contains("control-right") ? "right" : "left";
                transformItem(direction);
            }
        };
        let setUpListeners = function () {
            control.forEach(function (item) {
                item.addEventListener("click", controlClick);
            });
        };
        setUpListeners();
        
        return {
            right: function () { 
                transformItem("right");
            },
            left: function () { 
                transformItem("left");
            }
        };
    };
}());
let slider = groupSlider(".slider");

window.scroll({
    top: 2500, 
    left: 0, 
    behavior: 'smooth'
  });
  
  // Scroll certain amounts from current position 
  window.scrollBy({ 
    top: 100, // could be negative value
    left: 0, 
    behavior: 'smooth' 
  });
  
  // Scroll to a certain element
  document.querySelector('href').scrollIntoView({ 
    behavior: 'smooth' 
  });