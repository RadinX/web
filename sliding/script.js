window.onload = function() {
    let container = document.getElementById('container');
    let windowDiv = document.getElementById('window');
    let calculationDiv = document.getElementById('calculation');
    let rightContainer = document.getElementById('right-container'); // div baru

    let windowArray = [[0, 1, 0], [1, 5, 1], [0, 1, 0]];
    let boxes = [];

    // Generate 16x16 boxes
    for (let i = 0; i < 16; i++) {
        boxes[i] = [];
        for (let j = 0; j < 16; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            box.style.left = (j * 2.5) + 'vw';
            box.style.top = (i * 2.5) + 'vw';
            box.textContent = Math.floor(Math.random() * 8);
            boxes[i][j] = box;
            container.appendChild(box);
        }
    }
    
	// Generate 16x16 boxes with 0 in the right container
	let rightBoxes = []; // Reference to the boxes on the right
	for (let i = 0; i < 16; i++) {
		rightBoxes[i] = [];
		for (let j = 0; j < 16; j++) {
			let box = document.createElement('div');
			box.classList.add('box');
			box.style.left = (j * 2.5) + 'vw';
			box.style.top = (i * 2.5) + 'vw';
			box.textContent = '';
			rightBoxes[i][j] = box; // Store reference to box
			rightContainer.appendChild(box);
		}
	}
	
    // Generate 3x3 boxes in the window
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let box = document.createElement('div');
            box.classList.add('window-box');
            box.style.left = (j * 2.5) + 'vw';
            box.style.top = (i * 2.5) + 'vw';
            box.textContent = windowArray[i][j];
            windowDiv.appendChild(box);
        }
    }
	
    // Generate 3x3 boxes in the window
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let box = document.createElement('div');
            box.classList.add('window-box');
            box.style.left = (j * 2.5) + 'vw';
            box.style.top = (i * 2.5) + 'vw';
            box.textContent = windowArray[i][j];
            windowDiv.appendChild(box);
        }
    }

	// Function to calculate the result
	function calculateResult() {
		let left = parseFloat(windowDiv.style.left);
		let top = parseFloat(windowDiv.style.top);
		let iStart = Math.floor(top / (2.5 * window.innerWidth / 100));
		let jStart = Math.floor(left / (2.5 * window.innerWidth / 100));
		let total = 0;
		let equation = '1/9 * (';

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let boxValue = 0;
				if (iStart + i < 16 && jStart + j < 16) {
					let box = boxes[iStart + i][jStart + j];
					boxValue = parseInt(box.textContent, 10);
				}
				let windowBoxValue = windowArray[i][j];
				total += windowBoxValue * boxValue;

				equation += `${windowBoxValue} * ${boxValue}`;
				if (i < 2 || j < 2) {
					equation += ' + ';
				}
			}
		}

		let result = total / 9;
		equation += `) = ${result.toFixed(2)}`;
		calculationDiv.textContent = equation;

		// Update the corresponding box on the right grid
		if (iStart+1 < 16 && jStart+1 < 16) {
			rightBoxes[iStart+1][jStart+1].textContent = Math.round(result);
		}
	}

    // Make the window draggable
    windowDiv.onmousedown = function(event) {
        windowDiv.style.position = 'absolute';
        windowDiv.style.zIndex = 1000;

        function moveAt(pageX, pageY) {
            windowDiv.style.left = pageX - windowDiv.offsetWidth / 2 + 'px';
            windowDiv.style.top = pageY - windowDiv.offsetHeight / 2 + 'px';
        }

        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            calculateResult();
        }

        document.addEventListener('mousemove', onMouseMove);

        windowDiv.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            windowDiv.onmouseup = null;
        };
    };
};