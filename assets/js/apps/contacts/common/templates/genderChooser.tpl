<div class="control-label">Gender:</div>

<div class="radio inline">
    <label>
        <input type="radio" name="gender" id="genderM" value="M" <%= gender === 'M' ? "checked" : "" %>>
        <span class="gender-first"></span>
    </label>
</div>

<div class="radio inline">
    <label>
        <input type="radio" name="gender" id="genderF" value="F" <%= gender === 'F' ? "checked" : "" %> >
        <span class="gender-second"></span>
    </label>
</div>
