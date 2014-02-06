<form>
  <div class="control-group">
    <label for="contact-firstName" class="control-label">First name:</label>
    <input id="contact-firstName" name="firstName" type="text" value="<%= firstName %>"/>
  </div>
  <div class="control-group">
    <label for="contact-lastName" class="control-label">Last name:</label>
    <input id="contact-lastName" name="lastName" type="text" value="<%= lastName %>"/>
  </div>
  <div class="control-group">
    <label for="contact-phoneNumber" class="control-label">Phone number:</label>
    <input id="contact-phoneNumber" name="phoneNumber" type="text" value="<%= phoneNumber %>"/>
  </div>
    <div class="control-group">
        <div class="control-label">Gender:</div>

        <div class="radio inline">
            <label>
                <input type="radio" name="gender" id="genderF" value="F" <%= gender === 'F' ? "checked" : "" %> >
                F
            </label>
        </div>
        <div class="radio inline">
            <label>
                <input type="radio" name="gender" id="genderM" value="M" <%= gender === 'M' ? "checked" : "" %>>
                M
            </label>
        </div>


    </div>
  <button class="btn js-submit">Save</button>
</form>