Template.prototype.graph3DTemplate = () => `
<canvas id="graph3D"></canvas>
<br>
<input type="checkbox" id="togglePoints" name="points" checked="checked">
<label>Точки</label>
<input type="checkbox" id="togglePointNums" name="points" checked="checked">
<label>Номера точек</label>
<input type="checkbox" id="toggleEdges" name="edges" checked="checked">
<label>Рёбра</label>
<input type="checkbox" id="togglePolygones" name="polygones" checked="checked">
<label>Полигоны</label>
<br>
<select id="currentSubject">
    <option value="sphere">Сфера</option>
    <option value="cube">Куб</option>
    <option value="cone">Конус</option>
    <option value="ellipsoid">Эллипсоид</option>
    <option value="ellipticalCylinder">Эллиптический цилиндр</option>
    <option value="parabolicCylinder">Параболический цилиндр</option>
    <option value="hyperbolicCylinder">Гиперболический цилиндр</option>
    <option value="oneSheetHyperboloid">Однополосный гиперболоид</option>
    <option value="twoSheetHyperboloid">Двухполосный гиперболоид</option>
    <option value="ellipticalParaboloid">Эллиптический параболоид</option>
    <option value="hyperbolicParaboloid">Гиперболический параболоид (седло)</option>
</select>
`;
