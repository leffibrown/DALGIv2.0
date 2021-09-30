Template.prototype.calculatorTemplate = () => `
<div>
    <div class="info">
        <div id="calcElement"></div>    
        <div id="matrixSize"></div>
        <div id="vectorSize"></div>
        <button id="clearElement">Очистить элем.</button>
    </div>
    <div class="controls">
        <div>
            <button id="addMatrix">Добавить матрицу</button>
            <button id="subMatrixSize">-мат</button>
            <button id="addMatrixSize">+мат</button>
        </div>
        <div>
            <button id="addVector">Добавить вектор</button>
            <button id="subVectorSize">-век</button>
            <button id="addVectorSize">+век</button>
        </div>
        <button id="addComplex">+Компл. число</button>
    </div>
    <div class="calculator">
        <div id="elementA"></div>
		<div>
			<button id="add">Сложение</button>
			<button id="sub">Вычитание</button>
			<button id="mult">Умножение</button>
			<button id="div">Деление</button>
		</div>
		<div id="elementB"></div>
		<div id="calcResult"></div>
    </div>
</div>
`;
